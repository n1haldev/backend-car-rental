const bcrypt = require("bcrypt");
const signup = require("../models/users");
const jwt = require("jsonwebtoken");
require("dotenv").config


// -------------------------------------admin---------------------------------------//
// const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
// const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;



const generateToken = (user) => {
  const payload = { user: { id: user._id } };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); 
};

const signupPost = async (req, res) => {
  const { email, password } = req.body;
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  const SignedupUser = new signup({ email, password: hashedPassword });

  try {
    const user = await signup.findOne({ email });
    if (user) {
      res.status(404).json({ error: "User exists" });
    } else {
      await SignedupUser.save();
      const token = generateToken(SignedupUser);
      res.status(200).json({ message: "Signup successful", token });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const loginPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await signup.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = generateToken(user);
      res.status(200).json({ message: "Login successful", token });
      console.log("login successful");
    } else {
      res.status(401).json({ error: "Invalid password" });
      console.log("invalid password");
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    console.log("error occurred");
  }
};

// --------------------------------------------admin---------------------------------------------

const adminPost =(req,res)=>{
  const {email,password}=req.body;
  if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
    res.status(200).json({message:"admin login successful"})
  }
  else if(email!==process.env.ADMIN_EMAIL || password!==process.env.ADMIN_PASSWORD){
    res.status(404).json({message:"invalid credentials for admin"})
  }
}
module.exports = {
  signupPost,
  loginPost,
  adminPost
};
