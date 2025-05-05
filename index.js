const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./routes");
const passport = require("passport");
const authConfig = require("./auth/auth");

dotenv.config();
const PORT = process.env.PORT;
const app = express();

authConfig(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use((req, res, next) => {
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
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 2, httpOnly: true, secure: true }, // 2 horas
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
