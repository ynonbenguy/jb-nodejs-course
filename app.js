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
const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");

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

await mongoose.connect(`mongodb://${config.get("mongo.host")}:${config.get("mongo.port")}/${config.get("mongo.db")}`);
app.use(auth.session());
app.use(auth.initialize());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/',usersRouter);
app.use('/',guestRouter);
app.use('/github',githubRouter);

io.on("connection", (socket) => {
  console.log("a user has been connected");
  socket.on("updating values", (msg) => {
    io.emit('update from express', msg)
  })
})

app.use(notFound);
app.use(error);

server.listen(port, host, () => {
    console.log(`Example app listening on port ${port}`)
})
  