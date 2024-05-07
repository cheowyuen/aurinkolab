import express from "express";
import educationCentersController from "../controllers/educationCenters";

let educationCentersRouter = express.Router();

educationCentersRouter.get("/", educationCentersController.getAll);

export default educationCentersRouter;