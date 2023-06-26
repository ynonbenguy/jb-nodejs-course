const express = require("express");

const router = express.Router();

const dashboard = (req, res, next) => {
  res.send("dashboard");
};

const logout = (req, res, next) => {
  res.redirect("/welcome");
};

const addSymbol = (req, res, next) => {
  res.send("added symbol");
};

router.get("/dashboard", dashboard);
router.get("/logout", logout);
router.post("/symbol", addSymbol);

module.exports = router;
