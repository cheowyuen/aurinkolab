import express from "express";
import regattaController from "../controllers/regatta";

let regattaRouter = express.Router();

regattaRouter.post("/", regattaController.saveData);

export default regattaRouter;