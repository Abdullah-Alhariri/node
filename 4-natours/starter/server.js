/* eslint-disable prettier/prettier */
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./config.env" });
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

const server = app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANLED REJECTION! 💥 Shutting down... ");
  server.close(() => {
    process.exit(1);
  });
});
