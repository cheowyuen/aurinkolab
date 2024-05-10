import express from "express";
import resendLinkController from "../controllers/resendLink";

let resendLinkRouter = express.Router();

resendLinkRouter.post("/", resendLinkController.resendLink);

export default resendLinkRouter;