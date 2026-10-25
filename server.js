import express from "express";

const app = express();

const PORT = process.env.PORT;

//Serve static file from the public folder
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server listens on port ${PORT}`);
});
