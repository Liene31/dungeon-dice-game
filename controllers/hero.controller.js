import { heroService } from "../services/hero.service.js";

export const heroController = {
  getHeroes: async (req, res) => {
    try {
      const heroes = await heroService.getHeroes();
      return res.status(200).json({ heroes });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};
