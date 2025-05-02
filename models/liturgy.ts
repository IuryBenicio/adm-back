import mongoose from "../config/conn";
import { Schema } from "mongoose";

const Liturgy = mongoose.model(
  "Liturgy",
  new Schema({
    id: {
      type: Number,
      required: true,
      default: 1,
    },
    tema: {
      type: String,
      required: true,
    },
    subtema: {
      type: String,
    },
    versiculo: {
      type: String,
    },
    louvoresIniciais: [
      {
        nome: {
          type: String,
          required: true,
        },
        cantor: {
          type: String,
        },
      },
    ],
    pregador: {
      type: String,
    },
    louvorPosPalavra: [
      {
        nome: { type: String },
        cantor: { type: String },
      },
    ],
    santaCeia: { type: String },
    louvorCeia: [
      {
        nome: { type: String },
        cantor: { type: String },
      },
    ],
    avisos: [
      {
        titulo: {
          type: String,
          required: true,
        },
        descricao: {
          type: String,
        },
      },
    ],
  })
);

export default Liturgy;
