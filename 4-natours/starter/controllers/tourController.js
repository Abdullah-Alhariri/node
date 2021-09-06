const fs = require("fs");
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "Success",
    results: tours.length,
    data: { tours },
  });
};
exports.getTour = (req, res) => {
  // After th ":" comes the variable, the value is stored in req.params. For optional variables type ? after them
  const id = +req.params.id;
  const tour = tours.find((el) => +el.id === id);

  res.status(!tour ? 404 : 200).json({
    status: !tour ? "Not Found" : "Success",
    data: {
      tour,
    },
  });
};
exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body); // This overwrites original variable
  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    // Stringify : JS => JSON,
    res.status(201).json({
      // 201 = created
      status: "Success",
      results: tours.length,
      data: { tour: newTour },
    });
  });
};
exports.deleteTour = (req, res) => {
  const id = +req.params.id;

  res.status(tours.length < id || id < 0 ? 404 : 204).json({
    status: tours.length < id || id < 0 ? "Not Found" : "Success",
    data: null,
  });
};
exports.updateTour = (req, res) => {
  const id = +req.params.id;

  res.status(tours.length < id || id < 0 ? 404 : 200).json({
    status: tours.length < id || id < 0 ? "Not Found" : "Success",
    data: {
      tours: "Updated tour here...",
    },
  });
};
