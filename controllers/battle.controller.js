import { battleService } from "../services/battle.service.js";

export const battleController = {
  startBattle: async (req, res) => {
    const heroId = parseInt(req.body.heroId);
    try {
      const result = await battleService.startBattle(heroId);

      if (result.error) {
        return res.status(result.status).json({ error: result.error });
      }

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  playRound: (req, res) => {
    try {
      const result = battleService.playRound();
      if (result.error) {
        return res.status(result.status).json({ error: result.error });
      }
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  resetBattle: (req, res) => {
    try {
      battleService.resetBattle();
      return res.status(200).json({ message: "Battle reset." });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};
