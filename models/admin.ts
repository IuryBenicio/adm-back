import mongoose from "../config/conn";
import { Schema } from "mongoose";

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

export default Admin;
