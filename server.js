const express = require('express');
const basicAuth = require('express-basic-auth');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const users = {
    admin: '123',
    user: '456',
}

const auth = basicAuth({ users });

const PORT = process.env.PORT || 5000;

app.use(cookieParser('82e4e438a0705fabf61f9854e3b575af'));

app.use(express.static(path.join(__dirname, '/client/build')));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.get('/authenticate', auth, (req, res) => {
  const { user } = req.auth;
  console.log(1, 'authenticate: ', req.auth);

  if (user === 'admin') {
    res.cookie('name', 'admin').send({ screen: 'admin' });
  } else if (user === 'user') {
    res.cookie('name', 'user').send({ screen: 'user' });
  }

  // const options = {
  //   httpOnly: true,
  //   signed: true,
  // };
  // if (req.auth.user === 'admin') {
  //   res.cookie('name', 'admin', options).send({ screen: 'admin' });
  // } else if (req.auth.user === 'user') {
  //   res.cookie('name', 'user', options).send({ screen: 'user' });
  // }
});

app.get('/read-cookie', (req, res) => {
  const { name } = req.cookies;
  
  if(name === 'admin') {
    console.log(11, 'read-cookie', name);
    res.send({ screen: 'admin' });
  } else if (name === 'user') {
    console.log(12, 'read-cookie', name);
    res.send({ screen: 'user' });
  } else {
    console.log(13, 'read-cookie', name);
    res.send({ screen: 'auth' });
  }
//   if (req.signedCookies.name === 'admin') {
//     res.send({ screen: 'admin' });
//   } else if (req.signedCookies.name === 'user') {
//     res.send({ screen: 'user' });
//   } else {
//     res.send({ screen: 'auth' });
//   }
});

app.get('/clear-cookie', (req, res) => {
  console.log(20, 'clear-cookie', req.cookies.name);
  res.clearCookie('name').end();
});

// app.get('/get-data', (req, res) => {
//   if (req.signedCookies.name === 'admin') {
//     res.send('This is admin panel');
//   } else if (req.signedCookies.name === 'user') {
//     res.send('This is user data');
//   } else {
//     res.end();
//   }
// });


// app.get('/data', (req, res) => {
//     res.send(users);
// });
