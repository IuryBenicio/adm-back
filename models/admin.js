const mongoose = require("../config/conn");
const { Schema } = require("mongoose");

const Admin = mongoose.model(
  "Admin",
  new Schema({
    userName: {
      type: String,
      required: true,
    },
    senha: {
      type: String,
      required: true,
    },
  })
);

module.exports = Admin;
