/*
  login-mock

  This is the mock application for the Login Daal frontend component.

  Start with npm run develop.
*/

var jsonServer = require('json-server'),
  server = jsonServer.create(),
  middlewares = jsonServer.defaults();
const cors = require('cors');
const bodyParser = require('body-parser');

server.use(cors());
server.use(bodyParser.json());

/* User login */
server.post('/user/authentication', (req, res) => {
  if (req.body.email === 'err@x.com') {
    res.status(401).json({});
    return;
  }

  var data = {};
  data.accessToken = 'tesToken';
  res.status(201).json(data);
});

/* Facebook login */
server.get('/authfacebook/:id', (req, res) => {
  var data = {};
  data.accessToken = 'tesToken';
  res.status(201).json(data);
});

/* New user registration */
server.post('/user/users', (req, res) => {
  if (req.body.email === 'err@x.com') {
    res.status(401).json({});
    return;
  }

  let data = {};
  res.status(201).json(data);
});

/* Password reset */
server.post('/user/passwordreset', (req, res) => {
  if (req.body.email === 'err@x.com') {
    res.status(401).json({});
    return;
  }

  let data = {};
  res.status(201).json(data);
});

server.use(middlewares);

server.listen(3002, function() {
  console.log('Login Daal mock server started on port ' + 3002);
});
