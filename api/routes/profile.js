const express = require('express');
const router = express.Router();
const authguard = require('../guards/auth');
const User = require('../models/user');


router.get('/', authguard.isAuth, async (req, res, next) => {

  let token = req.headers['x-access-token'];
  if(token) {
    let user = await User.findOne({token: token}).select('name surname username friendrequests').populate({
      path: 'friendrequests',
      select: 'created from', 
      populate: {
        path: 'from',
        select: 'name surname username'
      }
    });
    res.status(200).json(user);
  }

});

router.get('/:username', authguard.isAuth, (req, res, next) => {

  let username = req.params['username'] || null;
  

});



module.exports = router;