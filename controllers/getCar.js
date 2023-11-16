const CarModel = require("../models/cars");
const mongoose = require("mongoose");


const getCar = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No car" });
  }

  try {
    const car = await CarModel.findOne({ _id: id });

    if (!car) {
      return res.status(400).json({ message: "No car found" });
    }

    res.status(200).json(car);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getCar,
};
