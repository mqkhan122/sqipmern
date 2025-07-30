import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Adminpage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/admin');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3333/api/adminpage', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRole(response.data.role); // Expecting: { role: 'admin' } or { role: 'user' }
        setLoading(false);
      } catch (error) {
        console.error("Unauthorized or Token Invalid", error);
        localStorage.removeItem('token');
        navigate('/admin');
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">{role === 'admin' ? 'Admin Panel' : 'User Panel'}</h2>
        <ul className="space-y-4">
          <li><button className="text-left w-full text-gray-700 hover:text-blue-600">Dashboard</button></li>

          {role === 'admin' && (
            <>
              <li><button className="text-left w-full text-gray-700 hover:text-blue-600">Users</button></li>
              <li><button className="text-left w-full text-gray-700 hover:text-blue-600">Settings</button></li>
            </>
          )}

          {role === 'user' && (
            <>
              <li><button className="text-left w-full text-gray-700 hover:text-blue-600">My Profile</button></li>
              <li><button className="text-left w-full text-gray-700 hover:text-blue-600">Support</button></li>
            </>
          )}

          <li>
            <button onClick={handleLogout} className="text-left w-full text-red-600 hover:underline">
              Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome, {role === 'admin' ? 'Admin' : 'User'}
          </h1>
          <p className="text-gray-500">Here's what's happening today:</p>
        </header>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {role === 'admin' ? (
            <>
              <div className="bg-white p-4 shadow rounded-lg">
                <h3 className="text-lg font-bold">Total Users</h3>
                <p className="text-2xl mt-2">124</p>
              </div>
              <div className="bg-white p-4 shadow rounded-lg">
                <h3 className="text-lg font-bold">New Signups</h3>
                <p className="text-2xl mt-2">8</p>
              </div>
              <div className="bg-white p-4 shadow rounded-lg">
                <h3 className="text-lg font-bold">Server Status</h3>
                <p className="text-green-600 mt-2 font-semibold">Online</p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white p-4 shadow rounded-lg">
                <h3 className="text-lg font-bold">Your Orders</h3>
                <p className="text-2xl mt-2">5</p>
              </div>
              <div className="bg-white p-4 shadow rounded-lg">
                <h3 className="text-lg font-bold">Support Tickets</h3>
                <p className="text-2xl mt-2">2</p>
              </div>
              <div className="bg-white p-4 shadow rounded-lg">
                <h3 className="text-lg font-bold">Messages</h3>
                <p className="text-2xl mt-2">3</p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Adminpage;
