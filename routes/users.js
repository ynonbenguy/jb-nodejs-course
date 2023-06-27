const express = require("express");
const validator = require("../middlewares/validator");
const validateSymbol = require("../controllers/users/users.validators");
const mysqlDB = require("../middlewares/mysql");
const user_symbols = require("../models/mysql/users_symbol");
const router = express.Router();

const dashboard = (req, res, next) => {
  res.send("dashboard");
};

const logout = (req, res, next) => {
  delete req.user;
  res.redirect("/welcome");
};

const addSymbol = (req, res, next) => {
  const userSymbol = new user_symbols(req.db);
  userSymbol.add({
      userID: 123,
      symbol: req.body.symbol
  });
  res.send(`added symbol: ${req.body.symbol}`);
};

router.get("/dashboard", dashboard);
router.get("/logout", logout);
router.post("/symbol", validator(validateSymbol), mysqlDB, addSymbol);

module.exports = router;
