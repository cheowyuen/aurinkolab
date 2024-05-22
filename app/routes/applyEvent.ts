import express from "express";
import applyEventController from "../controllers/applyEvent";

let applyEventRouter = express.Router();

applyEventRouter.post("/", applyEventController.applyEvent);

export default applyEventRouter;