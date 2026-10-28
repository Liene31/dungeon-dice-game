import express from "express";
import { heroController } from "../controllers/hero.controller.js";

export const heroRouter = express.Router();

heroRouter.get("/", heroController.getHeroes);
