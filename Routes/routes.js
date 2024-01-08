const express=require("express");
const router=express.Router();

const {signupPost,loginPost}=require("../controllers/Authentication")
const {adminPost}=require("../controllers/Authentication")
const {createCarPost}=require("../controllers/addCars")
const {getcars}=require("../controllers/getCars")
const {searchcars}=require("../controllers/searchCars")
const {updateCar}=require("../controllers/updateCar")
const {getCar}=require("../controllers/getCar")
const {getcarsHome}=require("../controllers/getCarsHome")
const {deleteCar}=require("../controllers/deleteCar")
const {filtercars} = require("../controllers/filterCars")
const {authenticateToken}=require("../middleware/auth")
const {authenticateAdminToken}=require("../middleware/auth")








// Public routes
router.post('/signup', signupPost);
router.post('/login', loginPost);
router.get('/getcarsHome', getcarsHome);
router.get('/getcars', getcars);
router.get('/searchCars', searchcars);
router.get('/filtercars', filtercars);



// user routes or client routes

router.get('/getcar/:id',authenticateToken, getCar);

//admin routes
router.post('/admin', adminPost);
router.post('/createcar',authenticateAdminToken, createCarPost);
router.post('/updatecar/:id',authenticateAdminToken, updateCar);
router.delete('/deletecar/:id',authenticateAdminToken, deleteCar);

















module.exports=router;