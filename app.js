const express = require('express');
const bodyParser=require('body-parser');
const app = express();
const path= require('path');
const stats = require('novelcovid');
const axios = require('axios');


stats.countries({country:'India'}).then(console.log) 


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// Express body parser
//app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//for using static files
app.use(express.static('public'));

//setting routes
app.use('/', require('./routes/index'));
app.use('/news', require('./routes/news'));

const server = app.listen(5000);
console.log('server running at port 5000');

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });


app.post('/send-msg',(req,res)=>
{
   runSample(req.body.MSG).then(data=>{
      res.send({Reply : data})
   });

});

//for symptom checker button
app.post('/send-msg1',(req,res)=>
{
   runSample('Symptom-Checker').then(data=>{
      res.send({Reply : data})
   });

});


////////-------->
//dialogflow integration
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const { response } = require('express');

// A unique identifier for the given session
const sessionId = uuid.v4();



/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample( msg ,projectId = 'covidbot-kfto') {
 

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
      keyFilename : "key/key.json"
  });
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: msg ,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
  return result.fulfillmentText;
}


