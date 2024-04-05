const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userdetailsSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
});

const userDetailsModel = mongoose.model("user-Details", userdetailsSchema);

module.exports = userDetailsModel;
