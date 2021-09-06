const dotenv = require("dotenv").config({ path: "./config.env" });
const app = require("./app.js");

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
