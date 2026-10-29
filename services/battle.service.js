import { getDBConnection } from "../db/db.js";

const db = await getDBConnection();

export const battleService = {
  startBattle: async (heroId) => {
    const playerHero = await battleService.getHeroById(heroId);

    if (!playerHero) {
      return { error: "Hero not found.", status: 404 };
    }

    const computerHero = await battleService.chooseComputerHero(heroId);
    if (!computerHero) {
      return { error: "No available opponent.", status: 409 };
    }

    const playerHp = playerHero.maxHp;
    const computerHp = computerHero.maxHp;

    return { playerHero, computerHero, playerHp, computerHp };
  },
  getHeroById: async (heroId) => {
    return await db.get(
      `
          SELECT *
          FROM heroes
          WHERE id = ?
          `,
      [heroId],
    );
  },
  chooseComputerHero: async (heroId) => {
    const heroes = await db.all("SELECT * FROM heroes");
    const pool = heroes.filter((hero) => hero.id !== Number(heroId));
    if (pool.length === 0) return null;
    return pool[Math.floor(Math.random() * pool.length)];
  },
};
