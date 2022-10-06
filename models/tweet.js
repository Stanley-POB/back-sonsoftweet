const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  content: String,
  usersID : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  isLiked: Boolean,
  

  
});

const Tweet = mongoose.model('tweet', tweetSchema);

module.exports = Tweet;