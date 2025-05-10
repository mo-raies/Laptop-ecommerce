"use client";
import React from "react";
import { useProductContext } from "../context/ProductContext";
import Link from "next/link";

const page = () => {
  const { cart, clearCart } = useProductContext();

  return (
    <div className="text-center my-5">
      <div className="container my-5" style={{ width: "55%" }}>
        {cart.length == 0 ? (
          <>
            <div className="text-center">
              <h1>Your cart is empty</h1>
              <Link href={"/"} className="btn btn-warning">
                Continue shoping.....
              </Link>
            </div>
          </>
        ) : (
          cart.map((product) => (
            <div
              key={product._id}
              className="card my-5 mb-3 bg-dark text-light"
              style={{ width: "700px" }}
            >
              <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-4 d-flex justify-content-center align-content-center p-3">
                  <img
                    src={product.imgSrc}
                    alt="img is not found"
                    className="card-img-top"
                    style={{
                      width: "200px",
                      border: "1px",
                      borderRadius: "10px solid yellow",
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.category}</p>
                    <button className="btn btn-primary mx-3">
                      {product.price}
                    </button>
                    <button className="btn btn-danger mx-3">Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <button onClick={() => clearCart()} className="btn btn-danger">
        Clear cart
      </button>
    </div>
  );
};

export default page;
