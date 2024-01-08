const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const routes = require("../Routes/routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); 

app.use(express.json());
app.use(cors(
    {
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
    credentials: true, 
    }
));

app.get("/",(req,res)=>{
    res.json({message:"welcome"})
})

app.use("/app", routes);

const mongoURI = process.env.MONGO_URI;



try {
  mongoose.connect(mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  });
  console.log("MongoDB connected successfully");
} catch (error) {
  console.error("Error connecting to MongoDB:",error);
}


app.listen(PORT, () => {
  console.log("Server is running");
});