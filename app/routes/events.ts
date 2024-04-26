import express from "express";
import eventsController from "../controllers/events";

let eventsRouter = express.Router();

eventsRouter.get("/", eventsController.getAll);

eventsRouter.get("/:id", eventsController.getOne);

export default eventsRouter;