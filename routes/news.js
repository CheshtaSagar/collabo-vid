const express = require("express");
const router = express.Router();
const stats = require('novelcovid');
const axios = require('axios');
const NewsAPI = require('newsapi');
 const newsapi = new NewsAPI('1e141336d3ba425799eca7cdce28d86f');

router.get("/", (req, res) => {
    newsapi.v2.everything({ q: "covid",sortBy: "relevancy",pageSize: 45,})
  .then((response) => {
    console.log(response.articles);
   res.render("news", { info: response.articles });
  });
  });


// router.post("/search", (req, res) => {
//   let search = req.body.search;
//   console.log(search)
//   //   newsapi.v2.everything({ q:search ,sortBy: "relevancy",pageSize: 45,})
//   // .then((response) => {
//   //   console.log(response.articles);
//   //const newsAPI = await axios.get(`https://raddy.co.uk/wp-json/wp/v2/posts?search=${search}`)
//   const response=axios.get(`GET https://newsapi.org/v2/everything?q=${search}&apiKey=1e141336d3ba425799eca7cdce28d86f`)
//     console.log(response.articles);
//    res.render("news", { info: response.articles });
//   });
  

router.get("/sort/:by", (req, res) => {
    newsapi.v2.everything({ q: "covid",sortBy:req.params.by ,pageSize: 45,})
  .then((response) => {
    console.log(response.articles);
   res.render("news", {
    info: response.articles,
   });
  });
  });

module.exports=router;