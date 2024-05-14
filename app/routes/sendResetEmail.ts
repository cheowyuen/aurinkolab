import express from "express";
import sendResetEmailController from "../controllers/sendResetEmail";

let sendResetEmailRouter = express.Router();

sendResetEmailRouter.post("/", sendResetEmailController.saveData);

export default sendResetEmailRouter;