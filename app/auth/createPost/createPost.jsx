"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const CreatePost = () => {
  const router = useRouter();

  const handleCreatePost = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/products", {
        title: "New Product",
        price: 9999,
        description: "Sample product",
        image: "https://via.placeholder.com/150",
      });

      if (res.status === 201 || res.status === 200) {
        router.push("/api/produts");
      } else {
        alert("Something went wrong!");
      }
    } catch (err) {
      console.error("Error creating product", err);
      alert("Error creating product");
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    imgSrc: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/products", formData);
      if (res.status === 201 || res.status === 200) {
        toast.success("Product created successfully!");
        router.push("/"); // redirect to homepage or products list
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create product");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Create New Product</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              required
              className="form-control mb-3"
              value={formData.title}
              onChange={handleChange}
            />
            <input
              type="text"
              name="imgSrc"
              placeholder="Image URL"
              required
              className="form-control mb-3"
              value={formData.image}
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              required
              className="form-control mb-3"
              value={formData.price}
              onChange={handleChange}
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              required
              className="form-control mb-3"
              value={formData.category}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              required
              className="form-control mb-3"
              value={formData.description}
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary w-100">
              Create Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
