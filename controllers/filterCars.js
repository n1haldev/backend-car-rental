const { json } = require("express");
const carDetails = require("../models/cars")

const filtercars = async(req, res) => {
    try {
        const { make,model,minPrice,maxPrice } = req.query;
        const regex = new RegExp(model, "i");
        const regex1 = new RegExp(make, "i");

        console.log(make)
        // console.log("make model bs",make, model, minPrice, maxPrice)

        const filtered = await carDetails.find({
            $and: [
              { make: { $regex: regex1 } },
              { model: { $regex: regex } },
              { price: { $gt: minPrice, $lt: maxPrice } }
            ]
          });
        console.log("filtered bs",filtered)          
        // const filtered = await carDetails.find({$and: [{make: { $regex: regex1 }}, {model: { $regex: regex }}, {price: {$and: [{ $gt: {minPrice}}, {$lt: {maxPrice}}]}}]})
        if(!filtered){
            res.status(404).send({message:"no cars yo"})
        }
        else{
            res.status(200).json(filtered)
        }
    //     if (filtered.length > 0) {
    //         res.status(204).json(filtered);
    //     }
    //     else {
    //         res.status  (404).json({ message: "No matching cars available at the moment!"});
    //     }
    }
    catch (error) {
        console.log("ERROR: ", error);
        res.status(500).json({ message: "Server Error!" });
    }
}

module.exports = {
    filtercars
}