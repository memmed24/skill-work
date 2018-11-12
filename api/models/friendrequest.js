const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendRequestSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  created: {
    type: Date, default: Date.now
  }
});

const fr = mongoose.model('friendrequests', FriendRequestSchema);
module.exports =  fr;