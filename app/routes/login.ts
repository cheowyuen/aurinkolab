import express from "express";
import LoginController from "../controllers/login";

let LoginRouter = express.Router();

LoginRouter.post("/", LoginController.login);

export default LoginRouter;