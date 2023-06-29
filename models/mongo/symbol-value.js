const mongoose = require("mongoose");

const symbolValueSchema = mongoose.Schema({
    symbol: String,
    timestamp: Date,
    value: Number,
  });

const SymbolValue = mongoose.model("SymbolValue", symbolValueSchema);

module.exports = SymbolValue;