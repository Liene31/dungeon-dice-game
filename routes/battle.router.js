import express from "express";
import { battleController } from "../controllers/battle.controller.js";

export const battleRouter = express.Router();

battleRouter.post("/start", battleController.startBattle);

battleRouter.post("/round", battleController.playRound);

battleRouter.post("/reset", battleController.resetBattle);
