import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
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
        "/auth/signup",
        formData
      );

      alert(res.data.message);

      navigate("/");

    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">

      <form
        onSubmit={handleSubmit}
        className="w-96 p-6 shadow-lg rounded-xl"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Signup
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          className="w-full border p-2 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="w-full border p-2 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="w-full border p-2 mb-4 rounded"
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full border p-2 mb-4 rounded"
          onChange={handleChange}
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        <button
          className="w-full bg-black text-white p-2 rounded"
        >
          Signup
        </button>

      </form>

    </div>
  );
}

export default Signup;
