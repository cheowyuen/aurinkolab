import express from "express";
import tutorsController from "../controllers/tutors";

let tutorsRouter = express.Router();

tutorsRouter.get("/", tutorsController.getAll);

export default tutorsRouter;