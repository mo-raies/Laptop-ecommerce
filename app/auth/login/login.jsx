"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
// import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useProductContext } from "../../context/ProductContext";
import { ToastContainer, toast, Bounce } from "react-toastify";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useProductContext();
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`/api/user/login`, user, {
        headers: {
          "content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setAuthUser(res.data.user);
        toast.success(res.data.message);

        setUser({
          username: "",
          password: "",
        });

        router.push("/");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || "Invalid username or password.";
      toast.error(message);
      console.error("Login failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

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
      <div
        className="container-fluid bg-dark min-vh-100 d-flex justify-content-center align-items-center overflow-hidden"
        style={{ height: "100vh" }}
      >
        <div
          className="w-100 d-flex justify-content-center align-items-center "
          style={{ maxWidth: "500px" }}
        >
          <form
            onSubmit={onSubmitHandler}
            className="bg-secondary p-4 p-sm-5 rounded shadow"
            // style={{ height: "100px", width: "100px" }}
          >
            <h2 className="mb-4 text-white text-center">Login</h2>

            <div className="mb-3">
              <label className="form-label">
                <span className="form-text text-white fs-5">Username:</span>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  autoComplete="new-username"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  required
                />
              </label>
            </div>

            <div className="mb-3">
              <label className="form-label">
                <span className="form-text text-white fs-5">Password:</span>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  autoComplete="new-password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  required
                />
              </label>
            </div>
            <p className="text-white">
              Dont have any Account?{" "}
              <Link className="text-warning" href={"/auth/signup"}>
                Signup
              </Link>
            </p>

            <button type="submit" className="btn btn-primary w-100">
              {loading ? (
                <>
                  Logging in...{" "}
                  <div
                    className="spinner-border text-white"
                    style={{ width: "1.5rem", height: "1.5rem" }}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </>
              ) : (
                "LOGIN"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
