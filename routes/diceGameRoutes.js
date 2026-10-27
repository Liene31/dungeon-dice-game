import { createDiceGameEngine } from "../domain/diceGameEngine.js";
import { heroes } from "../data/heroes.js";
import express from "express";

const engine = createDiceGameEngine(heroes);

export const heroRouter = express.Router();
export const battleRouter = express.Router();

heroRouter.get("/heroes", (req, res) => {
  try {
    const heroes = engine.getHeroes();
    return res.status(200).json({ heroes });
  } catch (err) {
    res;
    return res.status(500).json({ error: "Internal server error" });
  }
});

battleRouter.post("/start", (req, res) => {
  const heroId = parseInt(req.body.heroId);
  try {
    const players = engine.startBattle(heroId);

    return res.status(200).json(players);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

battleRouter.post("/round", (req, res) => {
  try {
    const roundDetails = engine.playRound();
    return res.status(200).json(roundDetails);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

battleRouter.post("/reset", (req, res) => {
  try {
    engine.resetBattle();
    return res.status(200).json({ message: "Battle reset." });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});
