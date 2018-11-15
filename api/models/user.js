const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fields = {
  name: String,
  surname: String,
  username: String,
  password: String,
  token: String,
  email: String,
  online: Boolean,
  notifications: [{
    type: Schema.Types.ObjectId,
    ref: 'notifications'
  }],
  friendrequests: [{
    type: Schema.Types.ObjectId,
    ref: 'friendrequests'
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: "users"
  }]
};
const UserSchema = new Schema(fields);
const User = mongoose.model('users', UserSchema);

module.exports = User;