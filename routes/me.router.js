import express from "express";
import { meController } from "../controllers/me.controller.js";

export const meRouter = express.Router();

meRouter.get("/", meController.getCurrentUser);
