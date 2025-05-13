"use client";
import Link from "next/link";
import React from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

import { useProductContext } from "../context/ProductContext";

const Product = ({ items }) => {
  const { addToCart, getCartItems } = useProductContext();

  // loader...spinner
  if (!items.length > 0)
    return (
      <div className="text-center my-5" style={{ marginTop: "30rem" }}>
        <div
          className="spinner-border"
          role="status"
          style={{ width: "4rem", height: "4rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="container my-5">
        <div className="row">
          {items.map((product) => (
            <div
              key={product._id}
              className="col-lg-4 col-md-6 my-3 d-flex justify-content-center"
            >
              <div
                className="card bg-dark text-light d-flex flex-column"
                style={{ width: "18rem", height: "100%", minHeight: "200px" }}
              >
                <Link href={`/${product._id}`}>
                  <div className="d-flex justify-content-center p-3">
                    <img
                      src={product.imgSrc}
                      alt="Image not found"
                      className="card-img-top"
                      style={{
                        width: "200px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                </Link>

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text flex-grow-1">{product.description}</p>

                  <div className="mt-auto">
                    <button className="btn btn-primary mx-2">
                      {product.price} ₹
                    </button>
                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        await addToCart(
                          product.title,
                          product.imgSrc,
                          product.price,
                          toast
                        );
                        await getCartItems();
                      }}
                      className="btn btn-warning mt-2"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
