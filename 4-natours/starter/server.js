/* eslint-disable prettier/prettier */
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./config.env" });
process.on("uncaughtException", (err) => {
  console.log(`\nUNCAUGHT EXCEPTION! 💥 Shutting down... \n${err.name} : ${err.message}\n`);
  process.exit(1);
});

const app = require("./app");
const port = process.env.PORT;

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTION\n"));

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`\nUNHANLED REJECTION! 💥 Shutting down... \n${err.name} : ${err.message}\n`);
  process.exit(1);
});
