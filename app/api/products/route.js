import { createProduct, getProducts } from "../../controllers/product";
import connectDB from "../../utils/database";


// http://localhost:3000/api/products
export async function POST(req) {
  await connectDB()
  return createProduct(req) 
}

export async function GET(req) {
  await connectDB()
  return getProducts(req) 
}