var express = require('express');
var router = express.Router();
const { checkBody } = require('../modules/checkBody');
const Tweet = require('../models/tweet')
require('../models/connexion');

router.post('/tweet', (req, res) => {
    if (!checkBody(req.body, ['content'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
    }

    Tweet.findOne({ content: req.body.content }).then(data => {
      if (data === null) {
        const newTweet = new Tweet({
          content: req.body.content,
          tweet: req.body.id,
        });
        newTweet.save().then(data => {
          res.json({ result: true, data:data});
        });
      } 
    });
  });

  module.exports = router;