import React, { useEffect, useState } from "react";

const History = ({ darkMode }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/history")
      .then((res) => res.json())
      .then(setHistory)
      .catch((err) => console.error("Error fetching history:", err));
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold">Chat History</h2>
      
      {history.length === 0 ? <p>No history available.</p> : null}
      
      <div className="mt-3 max-h-[500px] overflow-y-auto space-y-4">
        {history.map((entry, index) => (
          <div key={index} className={`p-3 rounded-md border transition-colors duration-300 
            ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-black"}`}>
            <strong>Q:</strong> {entry.question} <br />
            <strong>A:</strong> {entry.answer}
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
