import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { 
    type: String, 
    default: "https://res.cloudinary.com/dkrdj7bly/image/upload/v1735735516/default-avatar_c2opvg.png" 
  },
  phone: { type: String, default: "", },
  dob: { type: String, default: "Not Selected" },
  gender: { type: String, default: "Not Selected" },
  age: {
  type: Number,
  default: null
},
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;