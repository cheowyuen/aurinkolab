import express from "express";
import newsController from "../controllers/news";

let newsRouter = express.Router();

newsRouter.post("/add", newsController.addNews);
newsRouter.get("/latest", newsController.getLatest);
newsRouter.get("/", newsController.getAll);
newsRouter.get("/:id", newsController.getOne);

export default newsRouter;