import express from "express";
import approveTutorController from "../controllers/approveTutor";

let approveTutorRouter = express.Router();

approveTutorRouter.get("/", approveTutorController.getAll);
approveTutorRouter.post("/", approveTutorController.approveTutor);

export default approveTutorRouter;