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
  })
  .then(() => {
    console.log("db connection ");
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
});
const Tour = mongoose.model("Tour", tourSchema);

const testTour = new Tour({
  name: "The Forest Hiker",
  rating: 4.7,
  price: 497,
});
testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log("ERROR💥" + err);
  });

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
