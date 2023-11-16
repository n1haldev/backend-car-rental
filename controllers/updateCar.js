const mongoose = require("mongoose");
const carModel = require("../models/cars");

const updateCar = async (req, res) => {
  const { id } = req.params;
  const { make, model, year, price, description, image } = req.body;

  try {
    const updatedCar = await carModel.findOneAndUpdate(
      { _id: id },
      { make, model, year, price, description, image },
      { new: true } 
    );

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json(updatedCar);
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  updateCar,
};
