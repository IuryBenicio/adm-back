import session from "express-session";
import dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
const cors = require("cors");
import router from "./routes";
import passport = require("passport");
import authConfig from "./auth/auth";

const PORT = process.env.PORT;
const app = express();

authConfig(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, PATCH, POST, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 2, httpOnly: true, secure: true }, // 2 horas em milissegundos
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use("/admin", router);

try {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
} catch (e) {
  console.error("Error starting server:" + e);
}
