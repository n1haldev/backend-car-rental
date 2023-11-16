const carSchema=require("../models/cars")

const createCarPost=async(req,res)=>{
    const {make,model,year,price,description,image}=req.body
    const Signedupcars= new carSchema({make,model,year,price,description,image})
    try {
        const Car = await carSchema.findOne({make,model,year,price});
        if (Car) {
          res.status(404).json({ error: "Car exists" });
        } else {
          await Signedupcars.save();
          res.status(200).json({ message: "car addition successful" });
        }
      } catch (error) {
        res.status(500).json({ error: "An error occurred" });
      }
}


module.exports={
    createCarPost,
}