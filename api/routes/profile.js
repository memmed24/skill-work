const express = require('express');
const router = express.Router(),
  verbindung = require('./../db/db'),
  authguard = require('../guards/auth');


router.get('/', authguard.isAuth, (req, res, next) => {

  let token = req.headers['x-access-token'];

  let sql = `SELECT id, vorname, nachname, benutzername FROM benutzer WHERE token = '${token}'`;
  verbindung.query(sql, (err, response) => {

    let user = response ? response[0] : null;
    res.status(200).json({
      data: user
    });

  });

});

router.post('/:username', (req, res, next) => {

  let username = req.params.username || null;

  if (username) {
    let sql = `SELECT id, vorname, nachname, benutzername FROM benutzer WHERE benutzername = '${username}'`;
    verbindung.query(sql, (err, response) => {
      if (err) res.status(502).json({ message: 'Datenbankfehler' });
      res.status(200).json({
        data: response
      });
    });
  } else {
    res.json({

    });
  }

});



module.exports = router;