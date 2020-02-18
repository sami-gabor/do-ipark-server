const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const cookie = require('cookie');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');


const db = require('./queries.js');

const secret = 'Express is awesome!'; // used to sign cookies
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(cookieParser(secret));

// require('./routes.js')(app);


passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  console.log('strategy: ', 1);
  
  db.getUserByEmail(email, (err, user) => {
    console.log('strategy: ', 2, err, user);
    if (err) return done(null, false);
    if (!user) return done(null, false);

    return crypto.pbkdf2(password, secret, 1000, 128, 'sha256', (error, derivedKey) => {
      console.log('strategy: ', 3, derivedKey);
      if (!error && derivedKey.toString('hex') === user[0].password_hash) {
        console.log('strategy: ', 4, user[0], user[0].password_hash);
        return done(null, user);
      }
      return done(null, false);
    });
  });
}));

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));


app.get('/', (req, res) => {
  res.send('works!');
});

app.post('/test', (req, res) => {
  console.log(req.body);
  res.json({message: 'post works!'});
});

app.get('/failed', (req, res) => {
  res.send('Passport auth failed.');
});


app.post('/login-local', passport.authenticate('local', { failureRedirect: '/failed' }), (req, res) => { // req.user --> array of RowDataPacket
  const { email, password } = req.body;
  console.log('/login-local', req.body);
  
  db.getUserByEmail(email, (error, result) => {
    if (error) throw error;
    res.send(result);
  })
  // TODO: finish local auth
});


app.post('/register-local', (req, res) => {
  const { email, password } = req.body;
  const passwordPash = crypto.pbkdf2Sync(password, secret, 1000, 128, 'sha256').toString('hex');
  db.storeUserData(email, passwordPash);
  res.json({ screen: 'pageAuth!' });
});


app.listen(3000, console.log('Listening on port 3000.'));

