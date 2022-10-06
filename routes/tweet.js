var express = require('express');
var router = express.Router();
const { checkBody } = require('../modules/checkBody');
const Tweet = require('../models/tweet')
require('../models/connexion');
const uid2 = require('uid2');

router.post('/', (req, res) => {
    if (!checkBody(req.body, ['content'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
    }

    Tweet.findOne({ content: req.body.content }).then(data => {
      if (data === null) {
        const newTweet = new Tweet({
          content: req.body.content,
          tweet: req.body.id,
          token: uid2(32),
        });
        newTweet.save().then(data => {
          res.json({ result: true, data:data});
        });
      } 
    });
  });


  router.get('/', (req, res) => {
    Tweet.find().then(data => {
      res.json({ data: data });
    });
  });

  router.delete('/:_id', (req, res) => {
    Tweet.deleteOne({ _id: req.params._id }).then(deletedTweet => {
      if (deletedTweet.deletedCount > 0) {
        Tweet.find().then(data => {
          res.json({ result: true, data: data });
        });
      } else {
        res.json({ result: false, error: 'no tweet find' });
      }
    });
  });


  module.exports = router;