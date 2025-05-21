import React, { useEffect, useState } from "react";

const VotingResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/vote/results");
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching voting results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Voting Results</h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-gray-600">No results available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Candidate Name</th>
                <th className="py-3 px-6 text-left">Roll Number</th>
                <th className="py-3 px-6 text-left">Department</th>
                <th className="py-3 px-6 text-left">Total Votes</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {results.map((result) => (
                <tr key={result._id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{result.candidateDetails.username}</td>
                  <td className="py-3 px-6">{result.candidateDetails.rollno}</td>
                  <td className="py-3 px-6">{result.candidateDetails.department}</td>
                  <td className="py-3 px-6 font-bold text-blue-600">{result.totalVotes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VotingResults;