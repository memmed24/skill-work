const express = require('express');
const router = express.Router();
const auth = require('./../guards/auth');
const User = require('../models/user');
const Notification = require('../models/notification');


router.get('/', auth.isAuth, async (req, res, next) => {

  let notifications = await Notification.find({ to: req.auth['id'] })
    .select('type from created').populate({
      path: 'from',
      select: 'name surname username'
    });

  res.status(200).send(notifications);
  
});




module.exports = router;