import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config({path:'.env'})

const connectDB = async () => {
  if (mongoose.connection.readyState) {
    console.log("Already MongoDb Connected...!");
    return;
  }

  try {
    // console.log('DATABASE URL----',process.env.DATABASE_URL)
    await mongoose.connect("mongodb+srv://Raies:raies123@cluster0.ds1bg.mongodb.net/ecommerce-app");
    console.log("MongoDB Connected Successfully!");

  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
  }
};

export default connectDB;
