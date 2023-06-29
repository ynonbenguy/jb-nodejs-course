const express = require('express');
const config = require('config');
const usersRouter = require('./routes/users');
const guestRouter = require('./routes/guests');
const githubRouter = require('./routes/github');
const notFound = require('./middlewares/404');
const error = require('./middlewares/error');
const auth = require('passport');
const session = require("express-session");
const path = require("path");

const port = config.get('app.port');
const host = config.get('app.host');



const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    // store: sessionStore,
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 5,
    },
  }));

app.use(auth.session());
app.use(auth.initialize());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/',usersRouter);
app.use('/',guestRouter);
app.use('/github',githubRouter);

app.use(notFound);
app.use(error);

app.listen(port, host, () => {
    console.log(`Example app listening on port ${port}`)
})
  