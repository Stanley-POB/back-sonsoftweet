var express = require('express');
var router = express.Router();

require('../models/connexion');
const User = require('../models/users');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const { checkBody } = require('../modules/checkBody');


router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['firstname', 'username','password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  // Check if the user has not already been registered
  User.findOne({ firstname: req.body.firstname }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        firstname: req.body.firstname,
        username: req.body.username,
        password : hash,
        token: uid2(32),
      });

      newUser.save().then(newDoc => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: 'User already exists' });
    }
  });
});

router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['firstname', 'username','password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ firstname: req.body.firstname }).then(data => {
    if (bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
});








module.exports = router;
