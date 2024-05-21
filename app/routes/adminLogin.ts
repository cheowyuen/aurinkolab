import express from "express";
import adminLoginController from "../controllers/adminLogin";

let adminLoginRouter = express.Router();

adminLoginRouter.post("/", adminLoginController.login);

export default adminLoginRouter;