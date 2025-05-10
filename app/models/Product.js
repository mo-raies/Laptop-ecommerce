import mongoose  from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String
    },
    description: {
      type: String,
      required: true
    },
    category:{
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    imgSrc: {
      type: String,
      required: true
    }
  },{timestamps:true})

  export default mongoose.models.Product || mongoose.model("Product", productSchema);