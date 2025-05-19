import React from "react";

function Navbar({ role }) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "56px",
        backgroundColor: "#000", // black to match sidebar
        color: "white",        // sky blue text
        display: "flex",
        alignItems: "center",
        paddingLeft: "20px",
        borderBottom: "1px solid #111", // subtle border to separate navbar & sidebar
        fontWeight: "600",
        fontSize: "18px",
        zIndex: 1000,
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.5)", // subtle shadow for depth
        userSelect: "none",
      }}
    >
      <h4>{role}</h4>
    </nav>
  );
}

export default Navbar;
