import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true
    },
    username: {
      type: String,
      unique:true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    mobilenumber:{
      type: String,
      required: true
    },
    gender: {
      type: String,
      enum: ["male","female"],
      required: true
    },
    profilePhoto: {
      type: String,
      default: ""
    },

},{timestamps:true})

export default mongoose.models.User || mongoose.model('User', userSchema)
