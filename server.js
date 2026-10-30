import express from "express";
import session from "express-session";
import { battleRouter } from "./routes/battle.router.js";
import { heroRouter } from "./routes/hero.router.js";
import { authRouter } from "./routes/auth.router.js";
import { meRouter } from "./routes/me.router.js";

const app = express();

const { PORT, SECRET } = process.env;

//Serve static file from the public folder
app.use(express.static("public"));

app.use(express.json());
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  }),
);

app.use("/api/heroes", heroRouter);
app.use("/api/battle", battleRouter);
app.use("/api/auth/me", meRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server listens on port ${PORT}`);
});
