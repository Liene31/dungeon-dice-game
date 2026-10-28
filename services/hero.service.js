import { getDBConnection } from "../db/db.js";

const db = await getDBConnection();

export const heroService = {
  getHeroes: async () => {
    const heroes = await db.all("SELECT * FROM heroes");
    return heroes;
  },
};
