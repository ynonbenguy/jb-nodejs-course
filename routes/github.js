const express = require("express");
const passport = require("../middlewares/passport");

const router = express.Router();

const authenticate = (req, res, next) => {
  res.send("ok");
};

const callback = (req, res, next) => {
  res.send("ok");
};

router.get("/", passport.authenticate('github',{scope: 'user:email'}));
router.get('/callback', 
passport.authenticate('github', { successRedirect: '/dashboard', failureRedirect: '/welcome' }));

module.exports = router;