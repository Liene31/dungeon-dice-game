import { createDiceGameEngine } from "../domain/diceGameEngine.js";
import { heroes } from "../data/heroes.js";

const engine = createDiceGameEngine(heroes);

export const heroController = {
  getHeroes: (req, res) => {
    try {
      const heroes = engine.getHeroes();
      return res.status(200).json({ heroes });
    } catch (err) {
      res;
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};
