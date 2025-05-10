
import  Product  from "../models/Product";
import { NextResponse } from "next/server"

//add product 
export const createProduct = async (req) => {
  const body = await req.json();

  const newProduct = await Product.create(body);

  return NextResponse.json({
    message: "Product Added SuccessFully...!",
    newProduct,
  });
};

// get all product 
export const getProducts = async (req) => {
  const product = await Product.find();
  return NextResponse.json({
    message: "All Product Fetched.....!",
    success: true,
    product
  })
}
