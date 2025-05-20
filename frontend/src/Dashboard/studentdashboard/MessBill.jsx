import React, { useEffect, useState } from "react";

function MessBill() {
  const [status, setStatus] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [error, setError] = useState("");
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const fetchMessBill = async () => {
      const token = localStorage.getItem("Authorization");
      console.log("Token from localStorage:", token);

      if (!token) {
        setError("No authorization token found.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/mess/status", {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("Response data:", data);

        if (!response.ok) {
          setError(data.message || "Access denied");
        } else {
          if (data.bill) {
            setIsPaid(data.bill.isPaid);
            setStatus(data.bill.isPaid ? "Paid ✅" : "Pending ❌");
          } else {
            setStatus(data.message || "Status received");
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Something went wrong. Try again later.");
      }
    };

    fetchMessBill();
  }, []);

  const handlePayment = async () => {
    const token = localStorage.getItem("Authorization");

    try {
      const response = await fetch("http://localhost:3000/api/mess/pay", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setIsPaid(true);
        setStatus("Paid ✅");
        setShowCard(true);
      } else {
        setError(data.message || "Payment failed");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("Something went wrong during payment.");
    }
  };

  return (
    <>
      <div style={{ marginLeft: "270px", padding: "2rem" }}>
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "2rem",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "600px",
          }}
        >
          <h2
            style={{
              marginBottom: "1rem",
              borderBottom: "1px solid #ccc",
              paddingBottom: "0.5rem",
            }}
          >
            Mess Bill Status
          </h2>

          {error ? (
            <div style={{ color: "red", fontWeight: "bold" }}>{error}</div>
          ) : (
            <>
              <div
                style={{
                  fontSize: "18px",
                  lineHeight: "1.6",
                  marginBottom: "1rem",
                }}
              >
                {status}
              </div>

              {!isPaid && (
                <button
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    padding: "0.6rem 1.2rem",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                  onClick={handlePayment}
                >
                  Pay Now
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {showCard && (
        <div
          style={{
            backgroundColor: "#d4edda",
            border: "1px solid #c3e6cb",
            color: "#155724",
            padding: "1rem",
            borderRadius: "10px",
            marginTop: "1.5rem",
            maxWidth: "500px",
            marginLeft: "270px",
            textAlign: "left",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          🎉 Payment Successful!
        </div>
      )}
    </>
  );
}

export default MessBill;
