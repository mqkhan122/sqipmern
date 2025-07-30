
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Adminlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const finalsubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3333/api/login', { email, password });

      if (res.data.success) {
        const { token, role } = res.data;

        // ✅ Save to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        alert("Login successful");

        // ✅ Redirect based on role
        if (role === "admin") {
          navigate("/adminpage");
        } else if (role === "user") {
          navigate("/adminpage"); // Same page, you can customize UI inside
        } else {
          alert("Unknown role detected");
        }
      } else {
        setErrorMsg(res.data.message || "Invalid credentials");
      }

    } catch (err) {
      console.error(err);
      setErrorMsg("Login failed. Try again.");
    }
  };

  return (
    <section className='h-100 flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-semibold text-center'>Login</h1>

      {message && (
        <p className='text-red-500 mb-3'>{message}</p>
      )}

      <form onSubmit={finalsubmit} className='w-80'>
        <div className='mb-4'>
          <label>Email</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className='border rounded w-full px-2 py-1'
            placeholder='Enter Email'
          />
        </div>

        <div className='mb-4'>
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className='border rounded w-full px-2 py-1'
            placeholder='Enter Password'
          />
        </div>

        <button
          type="submit"
          className='border rounded w-full mt-3 bg-green-500 py-2 text-white hover:bg-white hover:text-black'>
          Login
        </button>
      </form>
    </section>
  );
};

export default Adminlogin;

