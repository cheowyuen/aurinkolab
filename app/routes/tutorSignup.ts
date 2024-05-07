import express from "express";
import tutorSignupController from "../controllers/tutorSignup";

let tutorSignupRouter = express.Router();

tutorSignupRouter.post("/", tutorSignupController.saveData);

export default tutorSignupRouter;