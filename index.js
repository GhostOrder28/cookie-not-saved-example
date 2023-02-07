const https = require('https');
const { readFileSync } = require('fs');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieSession = require('cookie-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userMock = {
  username: 'myuser',
  password: '123'
};

function verifyCallback (username, password, done){
  console.log('verify callback reached');
  try {
    if (username === userMock.username && password === userMock.password) {
      console.log('user verified');
      return done(null, userMock);
    } else {
      throw new Error('wrong credentials');
    };
  } catch (err) {
    throw new Error(err)
  }
}

const cookieSessionOptions = {
  name: 'session',
  maxAge: 24 * 60 * 60 * 1000,
  keys: [ 'key1', 'key2' ]
}

const app = express();

passport.use(new LocalStrategy(verifyCallback));
passport.serializeUser((userData, done) => {
  done(null, userData);
});
passport.deserializeUser((userId, done) => {
  done(null, userId); 
});

app.use(morgan('combined'));
app.use(cookieSession(cookieSessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/signin', passport.authenticate('local'), (req, res) => {
  console.log('body', req.body);
  res.status(200).json('success!')
})

app.get('/test', (req, res) => {
  if (req.isAuthenticated() && req.user) {
    res.status(200).json('credentials received, the user is authenticated')
  } else {
    res.status(401).json('credentials not received, the user is not authenticated')
  };
})

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use((err, res, next) => {
  console.log(err);
})

const server = https.createServer({
  cert: readFileSync(`${path.resolve()}/security/localhost.crt`),
  key: readFileSync(`${path.resolve()}/security/localhost.key`),
}, app);

const PORT = 3001;
server.listen(PORT, () => { console.log(`listening to port ${PORT}`); })
