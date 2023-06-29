const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const SymbolValue = require("./models/mongo/symbol-value");
const config = require("config");
const mysql = require('mysql2');
const util = require("util");



const scrape = async (symbol) => {
    try {
        const html = await axios(`https://www.google.com/finance/quote/${symbol}-USD`);
        const $ = cheerio.load(html.data);
        const value = Number($('div.YMlKec.fxKbKc').text().replace(",",""));
        const symbolValue = new SymbolValue({
            symbol,
            timestamp: new Date(),
            value,
          });
        await symbolValue.save();
    } catch (error) {
        console.log(error);
    }
    
}

const pool = mysql.createPool({
    host: config.get("mysql.host"),
    user: config.get("mysql.user"),
    password: config.get("mysql.password"),
    database: config.get("mysql.database"),
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
  });
  
pool.query = util.promisify(pool.query);
pool.execute = util.promisify(pool.execute);

const loop = async () => {
    const symbols = await pool.execute(`select distinct(symbol) from users_symbols`);
    console.log(`scarping: ${symbols.map(({symbol}) => symbol)}`);
    const promises = symbols.map(({symbol}) => scrape(symbol));
    await Promise.allSettled(promises);
    setTimeout(loop,10000);
}
(async () => {
    try {
        mongoose.connect("mongodb://localhost:27017/mymongo");
        loop();
    } catch (err) {
        console.log(err);
    }

})();
