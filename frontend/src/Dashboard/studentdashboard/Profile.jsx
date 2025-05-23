import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (!token) {
      navigate("/login/student");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/student/me", {
          headers: { Authorization: token },
        });
        const data = await res.json();
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("Authorization");
          navigate("/login/student");
        } else if (res.ok) {
          setProfile(data.student);
        } else {
          setError(data.message || "Failed to fetch profile.");
        }
      } catch (err) {
        setError("Error fetching profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <p className="text-center mt-20 font-semibold animate-pulse text-orange-600">
        Loading profile...
      </p>
    );
  }

  if (error || !profile) {
    return (
      <p className="text-center mt-20 text-red-600 font-medium">
        {error || "Profile data not found."}
      </p>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#F9F9F9" }}
    >
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg border border-gray-200 p-10">
        {/* Header */}
        <div className="flex items-center space-x-6 mb-10">
          <div
            className="w-20 h-20 flex items-center justify-center rounded-full shadow"
            style={{ backgroundColor: "#E83F25" }}
          >
            {/* Building Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="#FFFFFF"
              viewBox="0 0 24 24"
            >
              <path d="M3 21v-2h2V7h14v12h2v2H3zm12-2h2v-2h-2v2zm0-4h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-4h2v-2h-2v2zm-4 4h2v-2H7v2zm0-4h2v-2H7v2z" />
            </svg>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-black">{profile.username}</h1>
            <p className="text-sm italic text-black">{profile.email}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            ["Phone", profile.phone],
            ["Roll No", profile.rollno],
            ["Department", profile.department],
            ["Year", profile.year],
            ["Address", profile.address],
            ["Student Type", profile.typeofstudent],
            ["Room No", profile.roomno],
            ["Mess Opted", profile.messopted ? "Yes" : "No"],
          ].map(([label, value]) =>
            value ? (
              <div key={label}>
                <div className="text-sm font-semibold" style={{ color: "#E83F25" }}>
                  {label}
                </div>
                <div className="text-base font-medium text-black">{value}</div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
