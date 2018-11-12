const jwt = require('jsonwebtoken'),
  config = require('../config/config'),
  connection = require('../db/db'), 
  User = require('../models/user');

module.exports.isAuth = (req, res, next) => {

  let token = req.headers['x-access-token'];
  if (!token) return res.status(403).json({
    auth: false,
    message: 'No token provided'
  });

  jwt.verify(token, config.sekret, (err, decoded) => {

    if(err) return res.status(401).json({
      auth: false, 
      message: "Token is expired"
    });

    let user = User.findOne({token: token}).select('id online token').exec((err, response) => {
      if(err) return res.status(500).json(err);
      
      if(response) { 
        req.auth = response;
        return next();      
      } 
      return res.status(401).send('Unauthorized');
    });

  });

}