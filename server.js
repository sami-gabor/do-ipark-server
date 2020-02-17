const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/client/build')));
app.listen(PORT, () => console.log(`Listening on ${PORT}`));


app.get('/read-cookie', (req, res) => {
  console.log(req.cookies.name);
  
  if (req.cookies.name === 'admin') {
    res.json({ screen: 'admin' });
  } else {
    res.json({ screen: 'authPage' });
  }
});

app.get('/clear-cookie', (req, res) => {
  res.clearCookie('name').end();
})

app.post('/authenticate', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'admin' && password === '123') {
    res.cookie('name', 'admin');
    res.send({ screen: 'admin' });
  } else {
    res.send({ screen: 'authPage' });
  }
})

app.get('/parking-spots', (req, res) => {
  res.json({ list: [1, 3, 5] });
})