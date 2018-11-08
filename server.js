var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var cors = require('cors');


const morgan = require('morgan');
const bodyParser = require('body-parser');
const authentifizierung = require('./api/routes/authentifizierung');
const nachrichten = require('./api/routes/nachrichten');
const profile = require('./api/routes/profile');
const authguard = require('./api/guards/auth');
const verbindung = require('./api/db/db');
const notifications = require('./api/routes/notifications');


const port = 8000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static('dist'));

app.use(express.static(__dirname + '/dist/todo-front'));



// app.use(express.static('public'));



app.use('/api', authentifizierung);
app.use('/api/profile', profile);
app.use('/api/nachrichten', nachrichten);
app.use('/api/notification', notifications);






app.post('/api/profile/:id/send/friend/request', authguard.isAuth, (req, res, next) => {

  let loggedUser = req.benutzerdaten;
  let requestUser = req.params['id'];
  let sql = `INSERT INTO friendrequests (from_user, to_user) VALUES(${loggedUser['id']}, ${requestUser})`;

  // res.send(sql);
  verbindung.query(sql, (err, response) => {
    res.status(200).json({
      message: `Request has been sent ${loggedUser['vorname']}`
    });
    let sql = `INSERT INTO notifications (from_user, to_user, type) VALUES (${loggedUser['id']}, ${requestUser}, 1)`;

    verbindung.query(sql, (error, response2) => {
      if (error) return res.send(error);
      io.emit(`notification/${requestUser}`, {
        type: 1,
        name: loggedUser['vorname'],
        surname: loggedUser['nachname'],
        username: loggedUser['benutzername']
      });
    });



  });

});

app.post('/api/profile/:id/accept/friend/request', authguard.isAuth, (req, res, next) => {

  // let loggedUser = requ

});
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/dist/todo-front/index.html');
});


app.use((req, res, next) => {

  const error = new Error('Not found');
  error.status = 404;
  next(error);

});


app.use((error, req, res, next) => {

  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });

});


io.on('connection', function (socket) {
  console.log("connection has been made");
  socket.on("message", (data) => {
    console.log(data);
  });
});


server.listen(port, () => {
  console.log(`app is running on *:${port}`);
});
