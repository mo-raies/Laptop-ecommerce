import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String
    },
    imgSrc: {
      required: true,
      type: String
    },
    price: {
      required: true,
      type: String
    }
  },{timestamps: true})

  export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);