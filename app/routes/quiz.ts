import express from "express";
import quizController from "../controllers/quiz";

let quizRouter = express.Router();

quizRouter.post("/", quizController.saveData);

export default quizRouter;