import React, { useState, useEffect } from "react";
import Chatbot from "./components/Chatbot";
import DarkModeToggle from "./components/DarkModeToggle";
import History from "./components/History";

const App = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [showHistory, setShowHistory] = useState(false);

  // Apply theme on mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className={`min-h-screen flex flex-col p-4 transition-colors duration-300 
      ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>

      {/* Header Section */}
      <div className="flex justify-between items-center w-full max-w-6xl mx-auto mb-4">
        <h1 className="text-3xl font-bold">AI ChatBot</h1>
        <div className="flex gap-3">
          {/* Toggle History Button - Floating Top Right */}
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="px-2 py-2 text-sm rounded-full bg-blue-500 text-white hover:bg-blue-600 
            transition duration-300 shadow-md flex items-center"
            title={showHistory ? "Hide History" : "Show History"}
          >
            {showHistory ? "❌" : "📜"}
          </button>

          {/* Dark Mode Toggle */}
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </div>

      {/* Chat & History Layout */}
      <div className={`flex w-full max-w-6xl mx-auto transition-all duration-300 gap-4 
        ${showHistory ? "lg:flex-row" : "lg:flex-row"} flex-col`}>

        {/* Left Panel - Chatbot */}
        <div className={`flex-1 p-4 rounded-lg shadow-lg transition-colors duration-300 
          ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          <Chatbot darkMode={darkMode} />
        </div>

        {/* Right Panel - History (Shown When Toggled) */}
        {showHistory && (
          <div className={`lg:w-1/3 p-4 rounded-lg shadow-lg transition-colors duration-300 
            ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
            <History darkMode={darkMode} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
