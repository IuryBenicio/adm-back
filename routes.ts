import express from "express";
import { AdminController, LiturgyController } from "./controllers/admin";
const router = express.Router();

router.post("/login", AdminController.login);
router.post("/register", AdminController.register);
router.post("/replaceliturgy", LiturgyController.postLiturgy);
router.get("/getbefore", LiturgyController.getLiturgyDB);

export default router;
