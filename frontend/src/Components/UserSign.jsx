import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    // Basic Validation
    if (!name || !email || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3333/api/register", {
        name,
        email,
        password,
        role: "user",
      });

      if (res.data.success) {
        alert("User Registered Successfully");
        navigate("/admin");
      } else {
        alert(res.data.message || "Registration Failed");
      }
    } catch (error) {
      alert("Server Error");
    }
  };

  return (
    <section style={{height:"100vh"}} className='h-100 flex flex-col leading-8.5 justify-center items-center'>
      <h2 className='text-3xl font-semibold text-center'>User Sign Up</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          value={formData.name}
          required
          className='border rounded  w-100 px-1'
        />
        <br /><br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
          className='border rounded  w-100 px-1'
        />
        <br /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          required
          className='border rounded  w-100 px-1'
        />
        <br /><br />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={formData.confirmPassword}
          required
          className='border rounded  w-100 px-1'
        />
        <br /><br />
        <button type="submit" className='border rounded  w-100 mt-3 bg-green-400 py-1 text-white hover:bg-white hover:text-black '>Register</button>
      </form>
    </section>
  );
};

export default UserSignup;
