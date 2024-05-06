import express from "express";
import verifyEmailController from "../controllers/verify";

let verifyEmailRouter = express.Router();

verifyEmailRouter.post("/", verifyEmailController.verifyEmail);

export default verifyEmailRouter;