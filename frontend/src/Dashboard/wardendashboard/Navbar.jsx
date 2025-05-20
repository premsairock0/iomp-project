import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ role }) {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("Authorization");
    navigate("/login-options");
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "56px",
          backgroundColor: "#000",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "20px",
          paddingRight: "20px",
          borderBottom: "1px solid #111",
          fontWeight: "600",
          fontSize: "18px",
          zIndex: 1000,
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.5)",
          userSelect: "none",
        }}
      >
        <h4>{role}</h4>

        <button
          onClick={() => setShowConfirm(true)}
          className="border border-white text-white px-4 py-1 rounded hover:bg-white hover:text-black transition"
        >
          LogOut
        </button>
      </nav>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
          <div className="bg-white max-w-md w-full rounded shadow p-6">
            <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
            <p className="text-gray-700 mb-6">Are you sure you want to log out?</p>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
