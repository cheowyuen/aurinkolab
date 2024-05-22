import express from "express";
import newsController from "../controllers/news";

let newsRouter = express.Router();

newsRouter.post("/", newsController.addNews);

export default newsRouter;