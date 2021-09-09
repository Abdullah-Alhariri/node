const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      trim: true,
      maxlength: [40, "A tour name must have less or equal the 40 characters"],
      minlength: [10, "A tour name must have more or equal the 10 characters"],
    },
    duration: {
      type: Number,
      required: [true, "A tour must have a durations"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is eather easy, medium or difficult",
      },
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "A tour must have a description"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have a cover image"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      selected: false, // to not acces this from the API
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      max: [5, "Rating must be less or equal 5.0"],
      min: [1, "Rating must be above or equal 1.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    startDates: [Date],
    images: [String],
    priceDiscount: Number,
  },
  {
    toJSON: { virtuals: true },
    toObjects: { virtuals: true },
  }
);

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
