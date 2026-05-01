import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/dashboard");

    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-gray-900 to-black">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-[400px]"
      >

        <h1 className="text-4xl font-bold text-center mb-8 text-black">
          Welcome Back
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="w-full border border-gray-300 p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="w-full border border-gray-300 p-3 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-black"
          onChange={handleChange}
        />

        <button
          className="w-full bg-black hover:bg-gray-800 text-white p-3 rounded-xl transition-all duration-300"
        >
          Login
        </button>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?

          <Link
            to="/signup"
            className="ml-2 text-black font-semibold"
          >
            Signup
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Login;