import express from "express";
import resetPasswordController from "../controllers/resetPassword";

let resetPasswordRouter = express.Router();

resetPasswordRouter.post("/", resetPasswordController.resetPassword);

export default resetPasswordRouter;