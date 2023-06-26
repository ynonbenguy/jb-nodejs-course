const express = require('express');
const usersRouter = require('./routes/users');
const guestRouter = require('./routes/guests');
const githubRouter = require('./routes/github');

const notFound = require('./middlewares/404');
const error = require('./middlewares/error');

const port = 3000;
const host = 'localhost';
const app = express();

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
  