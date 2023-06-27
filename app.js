const express = require('express');
const config = require('config');
const usersRouter = require('./routes/users');
const guestRouter = require('./routes/guests');
const githubRouter = require('./routes/github');
const notFound = require('./middlewares/404');
const error = require('./middlewares/error');
const passport = require('passport');

const port = config.get('app.port');
const host = config.get('app.host');

const app = express();

app.use(passport.session());
app.use(passport.initialize());
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
  