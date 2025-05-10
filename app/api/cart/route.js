import connectDB from "../../utils/database.js";
import { addToCart, clearCart, getCartItems } from "../../controllers/cart.js";

// http://localhost:3000/api/cart
export async function POST (req){
  await connectDB();
  return addToCart(req);
}

// http://localhost:3000/api/cart
export async function GET(req){
  await connectDB();
  return getCartItems(req);
}

// http://localhost:3000/api/cart
export async function DELETE(req){
  await connectDB();
  return clearCart(req);
}