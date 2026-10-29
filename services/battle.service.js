import { getDBConnection } from "../db/db.js";

const db = await getDBConnection();

let playerHero = null;
let computerHero = null;
let playerHp = 0;
let computerHp = 0;

export const battleService = {
  startBattle: async (heroId) => {
    playerHero = await battleService.getHeroById(heroId);

    if (!playerHero) {
      return { error: "Hero not found.", status: 404 };
    }

    computerHero = await battleService.chooseComputerHero(heroId);
    if (!computerHero) {
      return { error: "No available opponent.", status: 409 };
    }

    playerHp = playerHero.maxHp;
    computerHp = computerHero.maxHp;

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

  rollPower: (power) => {
    return Math.floor(Math.random() * power) + 1;
  },

  playRound: () => {
    if (!playerHero || !computerHero) {
      return { error: "Battle has not started.", status: 409 };
    }

    if (playerHp === 0 || computerHp === 0) {
      return { error: "Battle has not started.", status: 409 };
    }

    const playerAttackRoll = battleService.rollPower(playerHero.attackPower);
    const computerAttackRoll = battleService.rollPower(
      computerHero.attackPower,
    );
    const playerDefenseRoll = battleService.rollPower(playerHero.defensePower);
    const computerDefenseRoll = battleService.rollPower(
      computerHero.defensePower,
    );

    // Positive damage only.
    const damageToComputer = Math.max(
      0,
      playerAttackRoll - computerDefenseRoll,
    );
    const damageToPlayer = Math.max(0, computerAttackRoll - playerDefenseRoll);

    computerHp = Math.max(0, computerHp - damageToComputer);
    playerHp = Math.max(0, playerHp - damageToPlayer);

    const outcome =
      computerHp === 0 && playerHp === 0
        ? "draw"
        : computerHp === 0
          ? "player_win"
          : playerHp === 0
            ? "player_loss"
            : "ongoing";

    const damageLine = `${damageToComputer} damage dealt to your opponent, ${damageToPlayer} damage dealt to you`;

    const message =
      outcome === "player_win"
        ? `You won the round! ${damageLine}`
        : outcome === "player_loss"
          ? `You lost the round! ${damageLine}`
          : outcome === "draw"
            ? `The round ended in a draw! ${damageLine}`
            : `Round continues. ${damageLine}`;

    return {
      playerHero,
      computerHero,
      playerAttackRoll,
      computerAttackRoll,
      playerDefenseRoll,
      computerDefenseRoll,
      damageToComputer,
      damageToPlayer,
      playerHp,
      computerHp,
      outcome,
      message,
    };
  },

  resetBattle: () => {
    playerHero = null;
    computerHero = null;
    playerHp = 0;
    computerHp = 0;
  },
};
