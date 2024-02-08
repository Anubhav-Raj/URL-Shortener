/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useState } from "react";
import { useUser } from "../Provider/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const LoginPage = () => {
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.user) {
        const userData = await login({
          name: response.data.user.name,
          email: response.data.user.email,
          token: response.data.user.token,
          id: response.data.user._id,
        });
        console.log("Login successful:", userData);
      }
      toast.success(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      // Handle login failure
      console.error("Login failed:", error);
      // Display error message or take appropriate action
    }
  };

  return (
    <div className="flex items-center justify-center h-screen  bg-purple-950 ">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-dark-purple">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-dark-purple"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-dark-purple"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className=" bg-purple-950 text-white px-4 py-2 rounded hover:bg-opacity-90"
          >
            Submit
          </button>
        </form>
        <Link to="/signup">Register</Link>
      </div>
    </div>
  );
};

export default LoginPage;
