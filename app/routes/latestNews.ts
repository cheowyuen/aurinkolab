import express from "express";
import latestNewsController from "../controllers/latestNews";

let newsRouter = express.Router();

newsRouter.get("/", latestNewsController.getLatest);

export default newsRouter;