import {createProduct } from "../../../controllers/product"
import connectDB from "../../../utils/database.js";

// http://localhost:3000/api/products
export async function POST(req) {
  await connectDB();
  return createProduct (req)
}