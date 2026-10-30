import { getDBConnection } from "../db/db.js";
import bcrypt from "bcryptjs";

const db = await getDBConnection();

export const authService = {
  register: async (userData) => {
    const isDataValid = authService.isUserInputValid(userData);
    if (isDataValid.error) {
      return isDataValid;
    }

    if (await authService.usernameAlreadyExists(isDataValid.username)) {
      return { error: "Username already exists", status: 409 };
    }

    return await authService.create(isDataValid);
  },

  login: async (userData) => {
    let { username, password } = userData;

    if (!username || !password) {
      return { error: "All fields are required.", status: 400 };
    }

    const userExist = await authService.usernameAlreadyExists(username);

    if (!userExist) {
      return { error: "Invalid credentials", status: 401 };
    }

    if (!(await bcrypt.compare(password, userExist.password))) {
      return { error: "Invalid credentials", status: 401 };
    }

    return userExist.id;
  },

  isUserInputValid: (userData) => {
    let { name, username, password } = userData;

    if (!name || !username || !password) {
      return { error: "All fields are required.", status: 400 };
    }

    name = name.trim();
    username = username.trim();

    return { name, username, password };
  },

  usernameAlreadyExists: async (username) => {
    return await db.get(
      `
          SELECT *
          FROM users
          WHERE username = ?
          `,
      [username],
    );
  },

  create: async (userData) => {
    const { name, username, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await db.run(
      `
                INSERT INTO users (name, username, password)
                VALUES(?, ?, ?)`,
      [name, username, hashedPassword],
    );
  },
};
