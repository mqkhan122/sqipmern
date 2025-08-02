import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Adminpage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateRoleForm, setShowCreateRoleForm] = useState(false); // ✅ New state
  const [showAssignRole, setShowAssignRole] = useState(false);
  const [showTotalRoles, setShowTotalRoles] = useState(false);
  const [frmdata, setfrmdata] = useState({ roleName: "" });

const handleinput = (e) => {
  setfrmdata({ ...frmdata, [e.target.name]: e.target.value });
};


const finalsubmit = async (e) => {
  e.preventDefault();
  try {
    console.log("Sending to API:", frmdata);

    await axios.post("http://localhost:3333/api/roles", frmdata, {
      headers: { 'Content-Type': 'application/json' }
    });
    alert("Role created successfully");
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    alert("Error found");
  }
};





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

        setRole(response.data.role);
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
              <li>
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="inline-flex justify-between w-full  py-2  text-gray-700 focus:outline-none"
                    >
                      Roles
                      <svg
                        className="-mr-1 ml-2 mt-1 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  {isOpen && (
                    <div className="absolute left-8 z-10 mt-2 w-44 origin-top-right bg-white shadow-lg">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setShowCreateRoleForm(true);
                            setShowAssignRole(false);
                            setShowTotalRoles(false);
                            setIsOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          Create Role
                        </button>

                        <button
                          onClick={() => {
                            setShowAssignRole(true);
                            setShowCreateRoleForm(false);
                            setShowTotalRoles(false);
                            setIsOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          Assign Role
                        </button>

                        <button
                          onClick={() => {
                            setShowTotalRoles(true);
                            setShowAssignRole(false);
                            setShowCreateRoleForm(false);
                            setIsOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          Total Roles
                        </button>

                      </div>
                    </div>
                  )}
                </div>
              </li>
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
      <main className="flex-1 p-6 relative">
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

              {showAssignRole && (
                <div className="w-full sm:w-1/3 bg-white shadow-lg z-50 p-6 overflow-auto" style={{width:"200%"}}>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Assign Role</h2>
                    <button onClick={() => setShowAssignRole(false)} className="text-gray-500 hover:text-red-500 text-2xl">
                      &times;
                    </button>
                  </div>
                  {/* Your assign role form here */}
                </div>
              )}

              {showTotalRoles && (
                <div className="w-full sm:w-1/3 bg-white shadow-lg z-50 p-6 overflow-auto" style={{width:"200%"}}>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Total Roles</h2>
                    <button onClick={() => setShowTotalRoles(false)} className="text-gray-500 hover:text-red-500 text-2xl">
                      &times;
                    </button>
                  </div>
                  {/* Fetch and show total roles here */}
                </div>
              )}

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

        {/* ✅ Create Role Panel */}
        {showCreateRoleForm && (
          <div className="fixed top-0 right-0 h-full w-full sm:w-1/3 bg-white shadow-lg z-50 p-6 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create Role</h2>
              <button
                onClick={() => setShowCreateRoleForm(false)}
                className="text-gray-500 hover:text-red-500 text-2xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={finalsubmit}>
              <div className="mb-4">
                <label htmlFor="roleName" className="block font-medium mb-1">
                  Role Name
                </label>
                <input
                  type="text"
                  name="roleName"
                  id="roleName"
                  onChange={handleinput}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Create Role
              </button>
            </form>
          </div>
        )}


      </main>
    </div>
  );
};

export default Adminpage;
