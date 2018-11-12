const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  type: Number,
  created: {
    type: Date, default: Date.now
  }
});

const notf = mongoose.model('notifications', NotificationSchema);
module.exports =  notf;