import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "node:path";
import { heroes } from "../data/heroes.js";

async function seedTable() {
  const db = await open({
    filename: path.join("db", "database.db"),
    driver: sqlite3.Database,
  });

  try {
    await db.exec("BEGIN TRANSACTION");

    for (const { name, attackPower, defensePower, maxHp, imageUrl } of heroes) {
      await db.run(
        `
            INSERT INTO heroes (name, attackPower, defensePower, maxHp, imageUrl)
            VALUES(?, ?, ?, ?, ?)`,
        [name, attackPower, defensePower, maxHp, imageUrl],
      );
    }

    await db.exec("COMMIT");
    console.log("All records inserted");
  } catch (err) {
    await db.exec("ROLLBACK");
    console.log("Error inserting data", err.message);
  } finally {
    await db.close();
    console.log("connection closed");
  }
}

await seedTable();
