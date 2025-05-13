"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaCartPlus } from "react-icons/fa";
import { useProductContext } from "../context/ProductContext";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const { data, setData, products, cart, authUser, setAuthUser } =
    useProductContext();
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activePrice, setActivePrice] = useState(null);

  const filterByCategory = (category) => {
    setActiveCategory(category);
    const filtered = products.filter(
      (product) => product.category === category
    );
    setData(filtered);
  };

  const filterByPrice = (price) => {
    setActivePrice(price);
    setData(products.filter((p) => p.price >= price));
  };

  const pathname = usePathname();
  const router = useRouter();

  const [searchTerm, setsearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search/${searchTerm}`);
    setsearchTerm("");
  };

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/user/logout`);
      localStorage.removeItem("user");
      setAuthUser(null);
      router.push("/auth/login");
      toast.success(res.data.message);
    } catch (error) {
      console.log("logout error--", error);
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expanded-lg sticky-top p-3 "
        style={{ background: "blue" }}
      >
        <div className="container d-flex justify-content-center align-items-center">
          <Link href={"/"} className="navbar-brand fw-bold text-light">
            {" "}
            Next.js E_commerce
          </Link>

          {/* Search-bar */}
          <form onSubmit={handleSubmit} className="d-flex flex-grow-1 mx-4">
            <div className="input-group">
              <input
                value={searchTerm}
                onChange={(e) => setsearchTerm(e.target.value)}
                type="text"
                className="form-control border-secondary "
                placeholder="Search Products...."
              />
              <button className="btn btn-danger" type="submit">
                <FiSearch />
              </button>
            </div>
          </form>

          {/* Cart-button */}
          <Link href={"/cart"} className="ms-2">
            <button className="btn btn-light position-relative">
              <FaCartPlus className="text-danger fs-4" />
              {cart.length > 0 && (
                <span className="position-absolute top-4 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.length}
                </span>
              )}
            </button>
          </Link>

          {/* logoutButton */}
          <div className="ms-2 px-4">
            {authUser ? (
              <button onClick={logoutHandler} className="btn btn-outline-light">
                Logout
              </button>
            ) : (
              <button onClick={logoutHandler} className="btn btn-outline-light">
                Login
              </button>
            )}
          </div>

          {/* Create product */}
          <div className="mx-2 px-2">
            <Link href="/auth/createPost">
              <button className="btn btn-light">Create Post</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* filter system */}
      {pathname == "/" && (
        <div className="container">
          <div className="bg-dark text-light">
            <div className="container p-3 rounded">
              <div className="row">
                {/* category filter */}
                <div className="col-md-6 d-flex flex-wrap align-items-center gap-2">
                  <strong>Category</strong>
                  <button
                    onClick={() => setData(products)}
                    className={`btn btn-outline-primary px-3 ${
                      activeCategory === "ALL" ? "active" : ""
                    }`}
                  >
                    ALL
                  </button>
                  <button
                    onClick={() => filterByCategory("mobiles")}
                    className={`btn btn-outline-primary px-3 ${
                      activeCategory === "mobiles" ? "active" : ""
                    }`}
                  >
                    Mobiles
                  </button>
                  <button
                    onClick={() => filterByCategory("laptops")}
                    className={`btn btn-outline-primary px-3 ${
                      activeCategory === "laptops" ? "active" : ""
                    }`}
                  >
                    Laptops
                  </button>
                  <button
                    onClick={() => filterByCategory("tablets")}
                    className={`btn btn-outline-primary px-3 ${
                      activeCategory === "tablets" ? "active" : ""
                    }`}
                  >
                    Tablets
                  </button>
                </div>

                {/* price filter */}
                <div className="col-md-6 d-flex flex-wrap align-items-center gap-2">
                  <strong>Price</strong>

                  <button
                    onClick={() => filterByPrice(29999)}
                    className={`btn btn-outline-warning px-3 ${
                      activePrice === 29999 ? "active" : ""
                    }`}
                  >
                    29,999
                  </button>
                  <button
                    onClick={() => filterByPrice(49999)}
                    className={`btn btn-outline-warning px-3 ${
                      activePrice === 49999 ? "active" : ""
                    }`}
                  >
                    49,999 ₹
                  </button>
                  <button
                    onClick={() => filterByPrice(69999)}
                    className={`btn btn-outline-warning px-3 ${
                      activePrice === 69999 ? "active" : ""
                    }`}
                  >
                    69,999 ₹
                  </button>
                  <button
                    onClick={() => filterByPrice(89999)}
                    className={`btn btn-outline-warning px-3 ${
                      activePrice === 89999 ? "active" : ""
                    }`}
                  >
                    89,999 ₹
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
