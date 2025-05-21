import React, { useEffect, useState } from "react";

export default function LatestUpdate() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/photos");
        const data = await response.json();

        if (Array.isArray(data)) {
          // Sort by most recent upload time
          const sortedPhotos = data.sort(
            (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
          );
          setPhotos(sortedPhotos);
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "30px",
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
        marginTop: "30px",
        maxWidth: "700px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h2
        style={{
          color: "#212529",
          marginBottom: "20px",
          fontSize: "26px",
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        📢 Latest Update
      </h2>

      {photos.length > 0 ? (
        photos.map((photo, index) => (
          <div
            key={photo._id}
            style={{
              marginBottom: "20px",
              borderBottom: "1px solid #e9ecef",
              paddingBottom: "15px",
            }}
          >
            <p
              style={{
                color: "#495057",
                fontSize: "16px",
                marginBottom: "5px",
              }}
            >
              Uploaded At:{" "}
              {new Date(photo.uploadedAt).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
            <a
              href={photo.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#007bff",
                fontSize: "16px",
                textDecoration: "none",
                wordBreak: "break-word",
              }}
            >
              🔗 Click to link {index + 1}
            </a>
          </div>
        ))
      ) : (
        <p style={{ color: "#6c757d", fontSize: "16px" }}>
          No photos uploaded yet.
        </p>
      )}
    </div>
  );
}
