"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// import { toast } from "react-toastify";
import { ToastContainer, toast, Bounce } from "react-toastify";

const Signup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    mobilenumber: "",
    gender: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`/api/user/register`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);

        router.push("/auth/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Signup failed:", error.response?.data || error.message);
    }
    setUser({
      fullname: "",
      username: "",
      password: "",
      mobilenumber: "",
      gender: "",
    });
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
      <div className="container-fluid bg-dark min-vh-100 d-flex justify-content-center align-items-start py-5">
        <div
          className="w-100 d-flex justify-content-center align-items-center"
          style={{ maxHeight: "500px", maxWidth: "500px" }}
        >
          <form
            onSubmit={onSubmitHandler}
            className="bg-secondary p-4 p-sm-5 rounded shadow w-100"
          >
            <h2 className="mb-4 text-white text-center">Registration</h2>

            <div className="mb-3">
              <label className="form-label">
                <span className="form-text text-white fs-5">Full Name:</span>
                <input
                  type="text"
                  name="fullname"
                  className="form-control"
                  value={user.fullname}
                  onChange={(e) =>
                    setUser({ ...user, fullname: e.target.value })
                  }
                  required
                />
              </label>
            </div>

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

            <div className="mb-3">
              <label className="form-label">
                <span className="form-text text-white fs-5">
                  Mobile Number:
                </span>
                <input
                  type="tel"
                  name="mobilenumber"
                  className="form-control"
                  value={user.mobilenumber}
                  onChange={(e) =>
                    setUser({ ...user, mobilenumber: e.target.value })
                  }
                  required
                />
              </label>
            </div>

            <div className="mb-3">
              <label className="form-label">
                <span className="form-text text-white fs-5">Gender:</span>
                <select
                  name="gender"
                  className="form-select"
                  value={user.gender}
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </div>

            <p className="text-white">
              Already have Account?{" "}
              <Link className="text-warning" href={"/auth/login"}>
                Login
              </Link>
            </p>

            <button type="submit" className="btn btn-primary w-100">
              {loading ? (
                <>
                  Registering...
                  <div
                    className="spinner-border text-white ms-2"
                    style={{ width: "1.5rem", height: "1.5rem" }}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </>
              ) : (
                "REGISTER"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
