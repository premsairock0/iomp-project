import React, { useEffect, useState } from "react";

function AdminHolidays() {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/holidays/")
      .then((res) => res.json())
      .then((data) => {
        setHolidays(data.holidays || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching holidays:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading holidays...</p>;

  // Get today's date without time (for comparison)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Separate completed and upcoming holidays
  const completedHolidays = holidays.filter(
    (h) => new Date(h.date) < today
  );
  const upcomingHolidays = holidays.filter(
    (h) => new Date(h.date) >= today
  );

  return (
    <div className="ml-[0px] mt-[30px] p-8 min-h-screen bg-gradient-to-tr from-blue-50 to-purple-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">General Holidays</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-xl overflow-hidden">
          <thead className="bg-indigo-200 text-gray-800">
            <tr>
              <th className="px-6 py-3 text-left">Occasion</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Day</th>
            </tr>
          </thead>
          <tbody>
            {/* Completed Holidays */}
            {completedHolidays.map((holiday, idx) => (
              <tr key={`completed-${idx}`} className="border-b hover:bg-indigo-50 text-gray-500">
                <td className="px-6 py-4">{holiday.occasion}</td>
                <td className="px-6 py-4">
                  {new Date(holiday.date).toLocaleDateString("en-IN")}
                </td>
                <td className="px-6 py-4">{holiday.day}</td>
              </tr>
            ))}

            {/* Separator row */}
            {completedHolidays.length > 0 && upcomingHolidays.length > 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 font-semibold bg-indigo-100 text-indigo-700">
                  Upcoming Holidays
                </td>
              </tr>
            )}

            {/* Upcoming Holidays */}
            {upcomingHolidays.map((holiday, idx) => (
              <tr key={`upcoming-${idx}`} className="border-b hover:bg-indigo-50">
                <td className="px-6 py-4">{holiday.occasion}</td>
                <td className="px-6 py-4">
                  {new Date(holiday.date).toLocaleDateString("en-IN")}
                </td>
                <td className="px-6 py-4">{holiday.day}</td>
              </tr>
            ))}

            {/* No holidays found */}
            {holidays.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-600">
                  No holidays found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminHolidays;
