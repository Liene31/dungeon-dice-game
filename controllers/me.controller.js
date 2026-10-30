import { meService } from "../services/me.service.js";

export const meController = {
  getCurrentUser: async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(200).json({ isLoggedIn: false });
      }
      const user = await meService.getCurrentUser(req.session.userId);
      return res.status(200).json({ isLoggedIn: true, name: user.username });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};
