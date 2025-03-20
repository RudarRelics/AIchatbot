import React from "react";

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`mt-2 px-4 py-2 rounded transition-colors duration-300 
      ${darkMode ? "bg-gray-100 text-black border border-gray-400" : "bg-gray-800 text-white border border-gray-600"}
      hover:bg-opacity-80`}
    >
      {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
