const express = require('express');
const router = express.Router();
const auth = require('./../guards/auth');
const connection = require('./../db/db');


router.get('/all', auth.isAuth, (req, res, next) => {

  let user = req.benutzerdaten;
  let sql = `SELECT b.vorname AS name, b.nachname AS surname, b.benutzername AS username, n.type, n.created_at FROM notifications n
    INNER JOIN benutzer b
    ON n.from_user = b.id
    WHERE to_user = '${user['id']}' ORDER BY n.id DESC`;

  connection.query(sql, (err, response) => {
    if (err) {
      return res.send(err)
    }
    res.send(response);

  })

});




module.exports = router;