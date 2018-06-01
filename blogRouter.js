const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require("./models");

BlogPosts.create("first","test content","me");
BlogPosts.create("second","test","me","july 1");
BlogPosts.create("third","test content content test","me");

router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

module.exports = router;