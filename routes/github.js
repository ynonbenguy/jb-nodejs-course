const express = require("express");
const passport = require("../middlewares/auth");

const router = express.Router();

const authenticate = (req, res, next) => {
  console.log("here1");
  next();
};

const callback = (req, res, next) => {
  res.send("ok");
};

router.get("/" ,passport.authenticate('github',{scope: 'user:email'}));
router.get('/callback', 
passport.authenticate('github', { failureRedirect: '/welcome',successRedirect: '/dashboard' }));

module.exports = router;