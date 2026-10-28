import express from "express";
import { battleRouter } from "./routes/battle.router.js";
import { heroRouter } from "./routes/hero.router.js";

const app = express();

const PORT = process.env.PORT;

//Serve static file from the public folder
app.use(express.static("public"));

app.use(express.json());

app.use("/api/heroes", heroRouter);
app.use("/api/battle", battleRouter);

app.listen(PORT, () => {
  console.log(`Server listens on port ${PORT}`);
});
