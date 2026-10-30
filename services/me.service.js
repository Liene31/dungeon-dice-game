import { getDBConnection } from "../db/db.js";

export const meService = {
  getCurrentUser: async (id) => {
    const db = await getDBConnection();
    return await db.get(
      `
          SELECT username
          FROM users
          WHERE id = ?
          `,
      [id],
    );
  },
};
