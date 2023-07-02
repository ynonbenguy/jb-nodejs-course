const express = require("express");
const validator = require("../middlewares/validator");
const validateSymbol = require("../controllers/users/users.validators");
const {middleware: mysqlDB} = require("../middlewares/mysql");
const user_symbols = require("../models/mysql/users_symbol");
const enforecUser = require('../middlewares/enforce-auth');
const SymbolValue = require("../models/mongo/symbol-value");

const router = express.Router();

const dashboard = async (req, res, next) => {
    try {
        const userSymbol = new user_symbols(req.db);
        const userSymbols = await userSymbol.findByUserID({
            userID: req.user.id
            //userID: '123'
        });

        const promises = [];
        userSymbols.forEach((userSymbol) => promises.push(SymbolValue.findOne({symbol: userSymbol.symbol}).sort({createdAt : -1}).limit(1)))
        const symbolValues = await Promise.all(promises);
        res.render('dashboard', {
            userSymbols,
            symbolValues,
        })
    } catch (err) {
        next(err);
    }

};

const logout = (req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error)
        } 
        return res.redirect("/welcome")
    })
  delete req.user;
  res.redirect("/welcome");
};

const addSymbol = (req, res, next) => {
  const userSymbol =  new user_symbols(req.db);
  userSymbol.add({
      userID: 123,
      symbol: req.body.symbol
  });
  res.send(`added symbol: ${req.body.symbol}`);
};

router.get("/dashboard",enforecUser, mysqlDB,dashboard);
router.get("/logout",enforecUser, logout);
router.post("/symbol", validator(validateSymbol), mysqlDB, addSymbol);

module.exports = router;
