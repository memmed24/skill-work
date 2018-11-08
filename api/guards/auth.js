const jwt = require('jsonwebtoken'),
  config = require('../config/config'),
  verbindung = require('../db/db');

module.exports.isAuth = (req, res, next) => {

  let token = req.headers['x-access-token'];
  if (!token) return res.status(403).json({
    auth: 'Gescheitert',
    message: 'Kein token gegeben'
  });
  jwt.verify(token, config.sekret, (err, decoded) => {

    // if (err) return res.status(500).send('Konnte api nicht authentifizieren');
    if(err) return res.status(500).send(err);

    let sql = `SELECT id, vorname, nachname, benutzername FROM benutzer WHERE token = '${token}'`;
    verbindung.query(sql, (error, result) => {
      if (error) return res.status(502).send('Datenbankfehler');

      if (result) {
        req.benutzerdaten = result[0];
        next();
      } else {
        res.status(401).send('Unauthorized');

      }


    })

  });

}