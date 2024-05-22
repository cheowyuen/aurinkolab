import express from "express";
import partnersController from "../controllers/partnersRegistration";

let partnersRouter = express.Router();

partnersRouter.post("/", partnersController.saveData);

export default partnersRouter;