import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    // Fetch Employees & Leave Requests from Backend
    const fetchData = async () => {
      try {
        const empRes = await fetch("http://localhost:5000/employees");
        const leaveRes = await fetch("http://localhost:5000/leave-requests");
        const empData = await empRes.json();
        const leaveData = await leaveRes.json();
        setEmployees(empData);
        setLeaveRequests(leaveData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <ul className="mt-5">
          <li className="p-2 hover:bg-gray-700 cursor-pointer">Dashboard</li>
          <li className="p-2 hover:bg-gray-700 cursor-pointer">Employees</li>
          <li className="p-2 hover:bg-gray-700 cursor-pointer">Leave Requests</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-5">HR Management Dashboard</h2>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Total Employees</h3>
            <p className="text-3xl">{employees.length}</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Pending Leave Requests</h3>
            <p className="text-3xl">{leaveRequests.filter((req) => req.status === "Pending").length}</p>
          </div>
        </div>

        {/* Employee List */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-2xl font-semibold mb-4">Employees</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3">ID</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border">
                  <td className="p-3">{emp.id}</td>
                  <td className="p-3">{emp.name}</td>
                  <td className="p-3">{emp.email}</td>
                  <td className="p-3">{emp.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Leave Requests */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-2xl font-semibold mb-4">Leave Requests</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3">ID</th>
                <th className="border p-3">Employee</th>
                <th className="border p-3">Reason</th>
                <th className="border p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((req) => (
                <tr key={req.id} className="border">
                  <td className="p-3">{req.id}</td>
                  <td className="p-3">{req.employee}</td>
                  <td className="p-3">{req.reason}</td>
                  <td className="p-3">{req.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
