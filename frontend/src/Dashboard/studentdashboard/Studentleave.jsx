import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Studentleave = () => {
  const [rollno, setRollno] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [letters, setLetters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLetters();
  }, []);

  const fetchLetters = async () => {
    const token = localStorage.getItem("Authorization");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:3000/api/studentletters/myletters", {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        setError(data.message || "Failed to fetch letters");
      } else {
        setLetters(data);
      }
    } catch (err) {
      setError("Error fetching previous letters");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("Authorization");
    if (!token) {
      navigate("/login/student");
      return;
    }

    if (!rollno || !description) {
      setError("Please fill in both fields.");
      return;
    }

    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      const response = await fetch("http://localhost:3000/api/studentletters/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ rollno, description }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to submit leave letter");
        setLoading(false);
        return;
      }

      setStatus(data.letter);
      setRollno("");
      setDescription("");
      fetchLetters(); // refresh letters
    } catch (err) {
      setError("Server error, try again later");
    }

    setLoading(false);
  };

  return (
    <div className="ml-[250px] mt-[56px] p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Submit Leave Letter</h2>

      <div
        className="bg-white rounded-2xl shadow-lg border border-gray-300 w-full max-w-xl
                   transform transition duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-purple-400/50
                   p-6 animate-fadeInUp"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700" htmlFor="rollno">
              Roll Number
            </label>
            <input
              type="text"
              id="rollno"
              value={rollno}
              onChange={(e) => setRollno(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your roll number"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Write your leave reason here"
              rows={4}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}

        {status && (
          <div className="mt-6 p-4 border rounded bg-gray-50">
            <h3 className="font-semibold text-lg text-gray-700">Leave Letter Submitted</h3>
            <p><strong>Roll Number:</strong> {status.rollno}</p>
            <p><strong>Description:</strong> {status.description}</p>
            <p><strong>Status:</strong> {status.status}</p>
          </div>
        )}
      </div>

      {/* Display Previous Letters */}
      <div className="mt-10 max-w-xl">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Your Previous Leave Letters</h3>
        {letters.length === 0 ? (
          <p className="text-gray-600">No letters submitted yet.</p>
        ) : (
          letters.map((letter) => (
            <div
              key={letter._id}
              className="bg-white border rounded p-4 mb-4 shadow-sm hover:shadow-md transition"
            >
              <p><strong>Roll No:</strong> {letter.rollno}</p>
              <p><strong>Description:</strong> {letter.description}</p>
              <p><strong>Submitted:</strong> {new Date(letter.createdAt).toLocaleString()}</p>
              <p><strong>Status:</strong> {letter.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Studentleave;