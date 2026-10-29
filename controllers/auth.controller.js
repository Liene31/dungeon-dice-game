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
      console.log(err);
      res
        .status(500)
        .json({ statusCode: 500, message: "Internal server error" });
    }
  },
};
