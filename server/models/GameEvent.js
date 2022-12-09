const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    type:"枚举"
});

module.exports = mongoose.model("GameEvent", schema);
