const express = require("express");

const router = express.Router();

const authenticate = (req, res, next) => {
  res.send("ok");
};

const callback = (req, res, next) => {
  res.send("ok");
};
router.get("/", authenticate);
router.get("/callbaack", callback);

module.exports = router;