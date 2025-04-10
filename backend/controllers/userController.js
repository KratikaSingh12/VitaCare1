import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import cloudinary from "cloudinary";

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.json({ success: true, token, user });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// API to login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.json({ success: true, token, user });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// Api to get usr profile data
 const getProfile = async(req,res)=>{
     try {
        console.log("profile here")
         const {userId} = req.body
         const userData = await userModel.findById(userId).select('-password')
         res.json({success:true,userData})
         

     } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
     }
 }

 //API to update profile
 const updateProfile = async(req,res) => {
  try {
      const{userId , name , phone , dob , gender} = req.body;
      const imageFile = req.file
      if(!name|| !phone || !dob || !gender){
           return res.json({success:false,message:"Data Missing"})
      }
      await userModel.findByIdAndUpdate(userId ,{name , phone , dob , gender })
      const usernow=await userModel.findById(userId)
      console.log(usernow)
      if(imageFile){
          const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
          const imageURL = imageUpload.secure_url
          await userModel.findByIdAndUpdate(userId,{image:imageURL})
      }
      res.json({success:true,message:"Profile Updated"})
  } catch (error) {
     console.log(error);
     return res.json({ success: false, message: error.message });
  }
}  


export { registerUser, loginUser , getProfile , updateProfile};
