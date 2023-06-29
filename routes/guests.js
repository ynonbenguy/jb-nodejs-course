const express = require("express");
const enforceGuest = require('../middlewares/enforce-guest');

const router = express.Router();

const welcome = (req, res, next) => {
    res.render('welcome');
};

router.get("/welcome",enforceGuest, welcome);

module.exports = router;
