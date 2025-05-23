import SelectVoters from "./SelectVoters";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Voting() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("Authorization");

  useEffect(() => {
    if (!token) {
      navigate("/login/warden");
      return;
    }

    fetch("http://localhost:3000/api/dashwarden/students", {
      headers: {
        Authorization: token,
      },
    })
      .then(async (res) => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("Authorization");
          navigate("/login/warden");
          return;
        }
        const data = await res.json();
        if (res.ok) {
          setStudents(data.students);
        } else {
          console.error("Failed to fetch students:", data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
      });
  }, [navigate, token]);

  return(
     <SelectVoters students={students} />
  )
}
export default Voting;