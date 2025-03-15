import React, { useState, useEffect } from "react";

const EmployeeDashboard = () => {
  const [user, setUser] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveReason, setLeaveReason] = useState("");

  useEffect(() => {
    // Fetch logged-in employee details & leave requests
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setUser(storedUser);

          const response = await fetch(`http://localhost:5000/leave-requests?email=${storedUser.email}`);
          const data = await response.json();
          setLeaveRequests(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/apply-leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, reason: leaveReason }),
      });

      if (response.ok) {
        alert("Leave request submitted!");
        setLeaveRequests([...leaveRequests, { email: user.email, reason: leaveReason, status: "Pending" }]);
        setLeaveReason("");
      } else {
        alert("Failed to submit leave request.");
      }
    } catch (error) {
      console.error("Error submitting leave request:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5">
        <h1 className="text-2xl font-bold">Employee Panel</h1>
        <ul className="mt-5">
          <li className="p-2 hover:bg-gray-700 cursor-pointer">Dashboard</li>
          <li className="p-2 hover:bg-gray-700 cursor-pointer">Apply for Leave</li>
          <li className="p-2 hover:bg-gray-700 cursor-pointer">Leave History</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-5">Employee Dashboard</h2>

        {/* Employee Details */}
        {user && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-2xl font-semibold mb-4">Your Details</h3>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        )}

        {/* Leave Request Form */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-2xl font-semibold mb-4">Apply for Leave</h3>
          <form onSubmit={handleLeaveSubmit} className="flex flex-col gap-4">
            <textarea
              className="p-3 border border-gray-400 rounded-lg"
              placeholder="Enter leave reason"
              value={leaveReason}
              onChange={(e) => setLeaveReason(e.target.value)}
              required
            />
            <button type="submit" className="bg-lime-500 text-gray-900 font-bold p-3 rounded-lg">Submit Leave Request</button>
          </form>
        </div>

        {/* Leave History */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-2xl font-semibold mb-4">Your Leave History</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3">ID</th>
                <th className="border p-3">Reason</th>
                <th className="border p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.length > 0 ? (
                leaveRequests.map((req, index) => (
                  <tr key={index} className="border">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{req.reason}</td>
                    <td className="p-3">{req.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-3" colSpan="3">No leave requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
