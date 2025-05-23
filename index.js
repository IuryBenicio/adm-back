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

aapp.use(
  cors({
    origin: ["http://localhost:5173", "https://adm-back.fly.dev"], // Frontend local e produção
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true, // Importante para cookies e sessões, se usar
  })
);

// Middleware padrão
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, PATCH, POST, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
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
