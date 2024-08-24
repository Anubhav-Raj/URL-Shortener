import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
const API_BASE_URL = "http://191.96.57.27:5000/api/auth";
function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log(data);
      const response = await axios.post(`${API_BASE_URL}/register`, data);
      console.log(response);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        toast.error(`Server error: ${error.response.data.message}`);
      } else if (error.request) {
        toast.error("No response received from server.");
      } else {
        toast.error("Error setting up the request.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B101B] text-white flex items-center justify-center">
      <ToastContainer />
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <div className="flex items-center bg-gray-900 rounded-full px-3 py-2">
              <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-2" />
              <input
                id="name"
                type="text"
                placeholder="Enter your username"
                className="bg-transparent px-4 py-2 border-none outline-none text-sm text-gray-200 placeholder-gray-400 flex-grow"
                {...register("name", { required: "Username is required" })}
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <div className="flex items-center bg-gray-900 rounded-full px-3 py-2">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-gray-400 mr-2"
              />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="bg-transparent px-4 py-2 border-none outline-none text-sm text-gray-200 placeholder-gray-400 flex-grow"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex items-center bg-gray-900 rounded-full px-3 py-2">
              <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                className="bg-transparent px-4 py-2 border-none outline-none text-sm text-gray-200 placeholder-gray-400 flex-grow"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 py-3 rounded-full text-sm text-white hover:bg-blue-500 transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>

          <div className="text-center mt-4 text-gray-400">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
