import { createDiceGameEngine } from "../domain/diceGameEngine.js";
import { heroes } from "../data/heroes.js";

const engine = createDiceGameEngine(heroes);

export const battleController = {
  startBattle: (req, res) => {
    const heroId = parseInt(req.body.heroId);
    try {
      const players = engine.startBattle(heroId);

      return res.status(200).json(players);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  playRound: (req, res) => {
    try {
      const roundDetails = engine.playRound();
      return res.status(200).json(roundDetails);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  resetBattle: (req, res) => {
    try {
      engine.resetBattle();
      return res.status(200).json({ message: "Battle reset." });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};
