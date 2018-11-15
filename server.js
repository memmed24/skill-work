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
const notifications = require('./api/routes/notifications');

// models
const Notification = require('./api/models/notification');
const User = require('./api/models/user');
const FriendRequest = require('./api/models/friendrequest');


const port = 8000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static('dist'));

app.use(express.static(__dirname + '/dist/todo-front'));
app.use('/api', authentifizierung);
app.use('/api/profile', profile);
// app.use('/api/nachrichten', nachrichten);
app.use('/api/notification', notifications);



app.post('/api/profile/:username/send/friend/request', authguard.isAuth, async (req, res, next) => {

  let username = req.params['username'];

  // check if user exists
  let user = await User.findOne({username: username});

  if(!user) {
    return res.status(404).json({
      message: 'User is not found'
    });
  }

  let auth = await User.findById(req.auth['id']).select('friendrequests');

  // check is friend request already sent

  let fr = await FriendRequest.findOne({from: req.auth['id'], to: user['id']});
  if(fr) {
    return res.status(403).json({
      message: "Friend request has sent"
    })
  }

  var friendreq = new FriendRequest({
    from: req.auth['id'],
    to: user['id']
  });
  friendreq.save();
  
  
  user.friendrequests.push(friendreq);
  auth.friendrequests.push(friendreq);  

 

  var notification = new Notification({
    type: 1
  });

  notification.from = req.auth['id'];
  notification.to = user['id'];

  user.notifications.push(notification);
  auth.save();
  user.save();

  notification.save().then((response) => {
    io.emit(`notification/${user['id']}`, {
      type: 1,
      name: req.auth['name'],
      surname: req.auth['surname'],
      username: req.auth['username']
    });
    res.send(response);
  }).catch(error => res.send(error));


});

app.post('/api/profile/:username/accept/friend/request', authguard.isAuth, async (req, res, next) => {

  let username = req.params['username'];
  let req_reciever = await User.findOne({token: req.auth['token']}).select('id name surname username friends');
  let req_sender = await User.findOne({username: username}).select('id name surname username friends');
 
  // check if friend request is exists 
  let friendrequest = await FriendRequest.findOne({from: req_sender['id'], to: req_reciever['id']});
  if(!friendrequest) {
    return res.status(500).json({
      message: "There's no request from this user"
    });
  }

  friendrequest.remove();

  req_reciever.friends.push(req_sender['id']);
  req_sender.friends.push(req_reciever['id']);
  req_reciever.save();
  req_sender.save();

  return res.status(200).json({
    'message': 'Friend accepted'
  });

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
