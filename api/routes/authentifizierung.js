const express = require('express'),
  router = express.Router(),
  passworthash = require('password-hash'),
  authguard = require('../guards/auth'),
  jwt = require('jsonwebtoken'),
  config = require('../config/config'),
  User = require('../models/user');


router.post('/registrieren', async (req, res) => {

  let fields = {
    name: req.body['vorname'] || null,
    surname: req.body['nachname'] || null,
    password: req.body['passwort'] ? passworthash.generate(req.body['passwort']) : null,
    username: req.body['benutzername'] || null,
    email: req.body['email'] || null
  }


  if (!fields.username || !fields.password) {
    return res.status(422).send({
      message: `Some field is missing :(`
    })
  }

  // check is user exists
  let checkUser = await User.findOne({ username: fields.username });

  if (checkUser) {
    return res.status(409).json({
      message: "User is already exist"
    });
  }

  user = new User(fields);

  user.save().then(response => {

    return res.status(200).json({
      auth: false,
      message: 'Registered successfully'
    })

  }).catch(error => res.status(500).json(error));


});

router.post('/login', async (req, res) => {

  let fields = {
    username: req.body['benutzername'] || null,
    password: req.body['passwort'] || null
  }

  if (!fields.username || !fields.password) {
    return res.status(422).send({
      message: `Some field is missing :(`
    })
  }

  let user = await User.findOne({ username: fields.username });

  if (!user) {
    return res.status(404).json({
      message: "User is not exist"
    });
  }

  if (!passworthash.verify(fields.password, user['password'])) {
    return res.status(401).json({
      auth: false,
      message: 'Wrong password'
    });
  }

  let token = jwt.sign({ id: user['_id'] }, config.sekret, {
    expiresIn: 86400
  });

  user.token = token;
  user.online = true;
  user.save().then(() => {
    res.status(200).json({
      auth: true, 
      token: token,
      username: user['username']
    });
  }).catch(error => res.status(500).json(error));


});

router.post('/logout', authguard.isAuth, (req, res) => {

  req.auth.token = null;
  req.auth.online = false;

  req.auth.save().then(() => {
    res.status(200).json({
      auth: false,
      message: 'Logged out'
    });
  }).catch(error => res.status(500).json(error));

});

router.post('/test', authguard.isAuth, (req, res) => {

  req.auth.name = "Anywone";
  req.auth.save();

  res.send({status: 'succes'});

});

module.exports = router;