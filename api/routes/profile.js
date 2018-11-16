const express = require('express');
const router = express.Router();
const authguard = require('../guards/auth');
const User = require('../models/user');
const FriendRequest = require('../models/friendrequest');


router.get('/', authguard.isAuth, async (req, res, next) => {

  let token = req.headers['x-access-token'];
  if (token) {
    let user = await User.findOne({ token: token }).select('name surname username friendrequests friends').populate({
      path: 'friendrequests',
      select: 'created from',
      populate: {
        path: 'from',
        select: 'name surname username'
      }
    });

    let data = {
      user: user
    };

    res.status(200).json(data);
  }

});

router.get('/:username', authguard.isAuth, async (req, res, next) => {

  let username = req.params['username'];
  var user = await User.findOne({ username: username }).select('name surname username friends').populate({
    path: 'friends',
    select: 'name surname username'
  });

  let data = {
    user: user,
  }

  let ifFriendRequestSent = await FriendRequest.findOne({
    from: req.auth['id'], to: user['id']
  });

  let isFriendRequestRecieved = await FriendRequest.findOne({
    to: req.auth['id'], from: user['id']
  });

  if (ifFriendRequestSent) {
    data['ifFriendRequestSent'] = true;
  } else {
    data['ifFriendRequestSent'] = false;
  }

  if (isFriendRequestRecieved) {
    data['isFriendRequestRecieved'] = true;
  } else {
    data['isFriendRequestRecieved'] = false;
  }


  res.send(data);


});



module.exports = router;