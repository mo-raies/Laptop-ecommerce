"use client";
import React, { useEffect, useState } from "react";
import { useProductContext } from "../context/ProductContext";
import Product from "../components/Product.jsx";

const page = ({ params }) => {
  const { slug } = React.use(params);
  const { products } = useProductContext();

  const [productById, setproductById] = useState(null);
  const [relatedProduct, setrelatedProduct] = useState([]);

  useEffect(() => {
    const filterProduct = products.find((p) => p._id === slug);

    if (filterProduct) {
      setproductById(filterProduct);

      const related = products.filter(
        (p) => p.category === filterProduct.category
      );
      setrelatedProduct(related);
      console.log("Related products:", relatedProduct);
    }
  }, [slug, products]);

  if (!productById) return <p className="text-center my-5">Loading.....</p>;

  return (
    <div className="container my-5">
      {/* Product Details Section */}
      <div className="row align-items-center flex-column-reverse flex-md-row">
        {/* Product Image */}
        <div className="col-12 col-md-6 d-flex justify-content-center p-3">
          <img
            src={productById.imgSrc}
            alt="img is not found"
            style={{
              width: "100%",
              maxWidth: "300px",
              height: "auto",
              border: "1px solid #ccc",
              borderRadius: "10px",
            }}
          />
        </div>

        {/* Product Info */}
        <div className="col-12 col-md-6 text-center text-md-start">
          <h1 className="card-title">{productById.title}</h1>
          <p className="card-text">{productById.description}</p>
          <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-md-start">
            <button className="btn btn-primary mb-2 mb-sm-0 me-sm-3">
              {productById.price}
            </button>
            <button className="btn btn-danger">Buy Now</button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <h1 className="text-center my-5">Related Products</h1>
      <Product items={relatedProduct} />
    </div>
  );
};

export default page;
