import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RegisterPage = () => {
  // const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: name,
          email: email,
          password: password,
        }
      );
      toast.success(response.data.message);
      setName("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        toast.error(`Server error: ${error.response.data.message}`);
      } else if (error.request) {
        toast.error("No response received from server.");
      } else {
        toast.error("Error setting up the request.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen  bg-purple-950 ">
      <ToastContainer />
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-dark-purple">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-dark-purple"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
