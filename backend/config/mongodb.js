import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // full URI from .env

    console.log("✅ Database Connected");

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB Connection Error:", err);
    });

  } catch (error) {
    console.log("🔍 URI:", process.env.MONGODB_URI);
    console.error("❌ Database Connection Failed:", error);
    process.exit(1);
  }
};

export default connectDB;
