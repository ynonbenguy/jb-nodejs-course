const express = require("express");
const validator = require("../middlewares/validator");
const validateSymbol = require("../controllers/users/users.validators");
const router = express.Router();

const dashboard = (req, res, next) => {
  res.send("dashboard");
};

const logout = (req, res, next) => {
  res.redirect("/welcome");
};

const addSymbol = (req, res, next) => {
  console.log(req.body.symbol);
  res.send(`added symbol ${req.body.symbol}`);
};

router.get("/dashboard", dashboard);
router.get("/logout", logout);
router.post("/symbol", validator(validateSymbol), addSymbol);

module.exports = router;
