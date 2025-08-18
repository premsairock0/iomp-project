import React, { useEffect, useState } from "react";

function Messbill() {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");

  useEffect(() => {
    fetch("https://jntuh-hostel-management.onrender.com/api/mess/all")
      .then(async (res) => {
        const data = await res.json();
        console.log(data)
        if (res.ok) {
          setBills(data.bills);
          setFilteredBills(data.bills);
        } else {
          console.error("Failed to fetch mess bills:", data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching mess bills:", err);
      });
  }, []);

  const handleFilter = () => {
    const filtered = bills.filter((bill) =>
      bill.student.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
    setFilteredBills(filtered);
  };

  const handleReset = () => {
    setSearchEmail("");
    setFilteredBills(bills);
  };

  return (
    <div style={{ padding: "1.5rem 2rem", backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
      <h1
        style={{
          textAlign: "center",
          fontWeight: "800",
          fontSize: "2.2rem",
          marginBottom: "1.8rem",
          color: "#1f2937",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        Mess Bill Information
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search by Email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          style={{
            padding: "0.5rem 0.75rem",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            fontSize: "1rem",
            width: "200px",
          }}
        />

        <button
          onClick={handleFilter}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#2563eb",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Filter
        </button>

        <button
          onClick={handleReset}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "1px solid #2563eb",
            backgroundColor: "white",
            color: "#2563eb",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>

      {filteredBills.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b7280" }}>No records found.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
          {filteredBills.map((bill) => (
            <div
              key={bill._id}
              style={{
                backgroundColor: "white",
                padding: "1.2rem",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                width: "300px",
                transition: "transform 0.2s",
              }}
            >
              <h3 style={{ margin: "0 0 0.5rem", color: "#1f2937" }}><><strong>Name</strong></> :{bill.student.username}</h3>
              <p style={{ margin: "0.25rem 0", color: "#374151" }}>
                <strong>Email:</strong> {bill.student.email}
              </p>
              <p style={{ margin: "0.25rem 0", color: "#374151" }}>
                <strong>Status:</strong>{" "}
                {bill.isPaid ? (
                  <span style={{ color: "green", fontWeight: "bold" }}>Paid</span>
                ) : (
                  <span style={{ color: "red", fontWeight: "bold" }}>Unpaid</span>
                )}
              </p>
              <p style={{ margin: "0.25rem 0", color: "#374151" }}>
                <strong>Payment Date:</strong>{" "}
                {bill.paymentDate ? new Date(bill.paymentDate).toLocaleDateString() : "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Messbill;
