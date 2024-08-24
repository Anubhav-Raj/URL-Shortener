import axios from "axios";
import { useState } from "react";
import { useUser } from "../Provider/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { faClipboard, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
const API_BASE_URL = "http://191.96.57.27:5000/api/auth";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log(data);
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: data.email,
        password: data.password,
      });
      if (response.data.user) {
        const userData = await login({
          name: response.data.user.name,
          email: response.data.user.email,
          token: response.data.user.token,
          id: response.data.user._id,
        });
        toast.success(response.data.message);

        // console.log("Login successful:", userData);
      }
      navigate("/dashboard");
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
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
                id="email"
                type="email"
                placeholder="Enter your Email"
                className="bg-transparent px-4 py-2 border-none outline-none text-sm text-gray-200 placeholder-gray-400 flex-grow"
                {...register("email", { required: "Username is required" })}
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
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
                {...register("password", { required: "Password is required" })}
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
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <div className="text-center mt-4 text-gray-400">
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
