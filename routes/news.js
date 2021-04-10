const express = require("express");
const router = express.Router();
const stats = require('novelcovid');
const axios = require('axios');
const NewsAPI = require('newsapi');
 const newsapi = new NewsAPI('1e141336d3ba425799eca7cdce28d86f');

router.get("/", (req, res) => {
    newsapi.v2.everything({ q: "covid",page: 4,})
  .then((response) => {
    console.log(response.articles);
   res.render("news", { info: response.articles });
  });
  });

module.exports=router;