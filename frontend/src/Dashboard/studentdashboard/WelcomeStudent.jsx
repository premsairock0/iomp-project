import React from "react";

function WelcomeStudent() {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "40px 30px",
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
        marginTop: "30px",
        transition: "transform 0.3s ease",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          color: "#212529",
          marginBottom: "16px",
          fontSize: "28px",
          fontWeight: "600",
        }}
      >
        Welcome to the Student Dashboard 🎓
      </h2>
      <p
        style={{
          color: "#495057",
          fontSize: "18px",
          lineHeight: "1.6",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        Here you can manage your profile, view your academic performance,
        access important announcements, and stay connected with your institution.
        Use the sidebar to navigate through various features.
      </p>
    </div>
  );
}

export default WelcomeStudent;
