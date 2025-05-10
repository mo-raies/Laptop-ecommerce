import Cart from "../models/Cart";
import { NextResponse } from "next/server";

// add item to cart
export const addToCart = async (req) => {
  const body = await req.json();

  const newCart = await Cart.create(body);

  return NextResponse.json({
    message: "Item add to Cart sucessfull....!",
    success: true,
    cartItem: newCart
  })
}

// get item from cart
export const getCartItems= async () => {
  const cartItems = await Cart.find();

  return NextResponse.json({
    message: "Fetched all cart Item....!",
    success: true,
    cartItems
  })

}

// clear all cart item 
export const clearCart = async() => {
  await Cart.deleteMany({});

  return NextResponse.json({
    message:"Cart has been cleared...!",
    success: true
  })
}