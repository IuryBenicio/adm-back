const express = require("express");
const { AdminController, LiturgyController } = require("./controllers/admin");
const router = express.Router();

router.post("/login", AdminController.login);
router.post("/logout", AdminController.logout);
router.post("/register", AdminController.register);
router.post("/replaceliturgy", LiturgyController.postLiturgy);
router.get("/getbefore", LiturgyController.getLiturgyDB);

module.exports = router;
