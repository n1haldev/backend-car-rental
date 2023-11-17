const carModel = require('../models/cars');

const deleteCar = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCar = await carModel.findOneAndDelete({ _id: id });

    if (!deletedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  deleteCar,
};
