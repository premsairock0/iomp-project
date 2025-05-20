import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Authorization");

    if (!token) {
      navigate("/login/student");
      return;
    }

    fetch("http://localhost:3000/api/student/me", {
      headers: {
        Authorization: token,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("Authorization");
          navigate("/login/student");
        } else if (res.ok) {
          setProfile(data.student);
        } else {
          console.error("Failed to fetch profile:", data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading profile...</p>;
  }

  if (!profile) {
    return <p className="text-center mt-10 text-red-500">Profile data not found.</p>;
  }

  return (
    <div className="ml-[250px] mt-[56px] p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Student Profile</h2>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-300 p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800 text-base">
          <div><strong>Username:</strong> {profile.username}</div>
          <div><strong>Email:</strong> {profile.email}</div>
          <div><strong>Phone:</strong> {profile.phone}</div>
          <div><strong>Roll No:</strong> {profile.rollno}</div>
          <div><strong>Department:</strong> {profile.department}</div>
          <div><strong>Year:</strong> {profile.year}</div>
          <div><strong>Address:</strong> {profile.address}</div>
          <div><strong>Student Type:</strong> {profile.typeofstudent}</div>
          {profile.roomno && <div><strong>Room No:</strong> {profile.roomno}</div>}
          <div>
            <strong>Mess Opted:</strong> {profile.messopted ? "Yes" : "No"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
