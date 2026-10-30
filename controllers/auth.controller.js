import { authService } from "../services/auth.service.js";

export const authController = {
  register: async (req, res) => {
    try {
      const result = await authService.register(req.body);
      if (result.error) {
        return res.status(result.status).json({ error: result.error });
      }
      return res.status(201).json({ message: "User registered" });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Registration failed. Please try again." });
    }
  },

  login: async (req, res) => {
    try {
      const result = await authService.login(req.body);
      req.session.userId = result.id;

      if (result.error) {
        return res.status(result.status).json({ error: result.error });
      }

      return res.status(200).json({ message: "Logged in" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Login failed. Please try again." });
    }
  },
};
