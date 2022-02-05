const mongoose = require("mongoose");
const { Schema } = mongoose;

const valuesSchema = new Schema({
  index: Number,
});

const Values = mongoose.model("Values", valuesSchema);

module.exports = { Values };
