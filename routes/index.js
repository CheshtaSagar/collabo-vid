  const express = require("express");
  const router = express.Router();
  const stats = require('novelcovid');
  const axios = require('axios');
  const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("1e141336d3ba425799eca7cdce28d86f");
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

  router.get("/IndiatopHeadlines", (req, res) => {
    newsapi.v2.topHeadlines({ q: "covid",language: 'en',
    country: 'in',})
      .then((response) => {
        console.log(response.articles);
        res.render("news", { info: response.articles });
      });
  });
  router.get("/topHeadlines", (req, res) => {
    newsapi.v2.topHeadlines({ q: "covid",language: 'en',})
      .then((response) => {
        console.log(response.articles);
        res.render("news", { info: response.articles });
      });
  });
  

  module.exports = router;
  
