  const express = require("express");
  const router = express.Router();
  const stats = require('novelcovid');
  const axios = require('axios');
  
  //rendering home page
  router.get("/", (req, res) => {
    res.render("home");
  });
  

  //chatbot
  router.get("/index", function (req, res) {
    res.render("index");
  });
  
  router.get("/countryStats", (req, res) => {
    stats.countries().then((response) => {
      //console.log(response);
      res.render("countryStats", {info:response});
    });
  });

  router.get("/IndiaStats", (req, res) => {
    stats.countries({country:'India'}).then((response) => {
      //console.log(response);
      res.render("stats", {info:response});
    });
  });


  module.exports = router;
  
