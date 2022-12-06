const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, requried: true },
  logo: { type: String, required: true },
  contactPerson: String,
  contactPhone: String,
  players: [
    {
      name: String,
      number: String,
      avatar: String,
      height: String,
      weight: String,
      position: String,
    },
  ],
});

module.exports = mongoose.model("Team", schema);
