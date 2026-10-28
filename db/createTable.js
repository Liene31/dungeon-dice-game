import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "node:path";

export async function createTable() {
  const db = await open({
    filename: path.join("db", "database.db"),
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS heroes(
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT UNIQUE NOT NULL,
        attackPower INTEGER NOT NULL,
        defensePower INTEGER NOT NULL,
        maxHp INTEGER NOT NULL,
        imageUrl TEXT NOT NULL  
    )
    `);

  await db.close();
  console.log("Table created");
}

await createTable();
