const express=require("express");
const router=express.Router();
const {signupPost,loginPost}=require("../controllers/Authentication")
const {adminPost}=require("../controllers/Authentication")
const {createCarPost}=require("../controllers/addCars")
const {getcars}=require("../controllers/getCars")
const {updateCar}=require("../controllers/updateCar")
const {getCar}=require("../controllers/getCar")
const {getcarsHome}=require("../controllers/getCarsHome")








router.post("/signup",signupPost);
router.post('/login',loginPost); 
router.post("/admin",adminPost)
router.post("/createcar",createCarPost)
router.get("/getcars",getcars)
router.get("/getcarsHome",getcarsHome)
router.get("/getcar/:id",getCar)
router.post("/updatecar/:id",updateCar)















module.exports=router;