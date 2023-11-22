const carDetails = require("../models/cars")

const filtercars = async(req, res) => {
    try {
        const { make } = req.make;
        const { name } = req.search;
        const { others } = req.filter;
        const minPrice = others.minPrice;
        const maxPrice = others.maxPrice;

        const filtered = await carDetails.find({$and: [{make: make}, {model: name}, {price: {$and: [{ $gt: {minPrice}}, {$lt: {maxPrice}}]}}]})

        if (response.length > 0) {
            res.status(200).json(filtered);
        }
        else {
            res.status(404).json({ message: "No matching cars available at the moment!"});
        }
    }
    catch (error) {
        console.log("ERROR: ", error);
        res.status(500).json({ message: "Server Error!" });
    }
}

module.exports = {
    filtercars
}