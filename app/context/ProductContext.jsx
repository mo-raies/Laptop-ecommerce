"use client";
import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

// create product context
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  const [authUser, setAuthUser] = useState(
    useEffect(() => {
      const user = localStorage.getItem("user");
      if (user) {
        setAuthUser(JSON.parse(user));
      }
    }, [])
    // JSON.parse(localStorage.getItem("user")) || null
  );

  const fetchAllProducts = async () => {
    const api = await axios.get(`/api/products`);
    setData(api.data.product);
    setProducts(api.data.product);
    console.log("fetched all products :", products);
  };

  const addToCart = async (title, imgSrc, price, toast) => {
    try {
      const api = await axios.post(`/api/cart`, {
        title,
        imgSrc,
        price,
      });

      if (api.data.success) {
        toast.success(api.data.message, {
          position: "top-right",
          autoClose: 1500,
        });
      }
      console.log("product added to cart :", api.data);
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const getCartItems = async () => {
    const api = await axios.get(`${API_BASE_URL}/cart`);
    setCart(api.data.cartItems);
    console.log(api.data);
  };

  const clearCart = async () => {
    const api = await axios.delete(`${API_BASE_URL}/cart`);
    getCartItems();
  };

  useEffect(() => {
    getCartItems();
    fetchAllProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        data,
        cart,
        setData,
        addToCart,
        getCartItems,
        clearCart,
        authUser,
        setAuthUser,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

//custom hook for context
export const useProductContext = () => useContext(ProductContext);

// export default ProductProvider;
