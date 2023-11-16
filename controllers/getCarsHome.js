const carDetails=require("../models/cars")

const getcarsHome = async(req,res)=>{
    const cars = await carDetails.find().limit(3)
    if(cars.length>0){
        res.status(200).send(cars)
    }
    else{
        res.status(404).send({message:"no cars yo"})
    }
}
module.exports={
    getcarsHome,
}