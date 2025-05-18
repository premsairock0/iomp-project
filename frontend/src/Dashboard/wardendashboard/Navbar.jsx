import React from "react";

function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "56px",
        backgroundColor: "#007bff",
        color: "white",
        display: "flex",
        alignItems: "center",
        paddingLeft: "20px",
        zIndex: 1000,
      }}
    >
      <h4>Warden Dashboard</h4>
    </nav>
  );
}

export default Navbar;
