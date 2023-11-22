const carDetails = require("../models/cars")

const searchcars = async(req, res) => {
    try {
        const { name } = req.query;
        const regex = new RegExp(name, "i");

        const searchedcars = await carDetails.find({ $or: [{make: { $regex: regex } }, {model: { $regex: regex }}]});

        if(searchedcars.length > 0) {
            res.status(200).json(searchedcars);
        }
        else {
            res.status(404).json({ message : "No matching cars are available at the moment!"});
        }
    }
    catch(error) {
        console.error("ERROR: ", error);
        res.status(500).json({ message: "Server Error!"});
    }
}

module.exports = {
    searchcars,
}