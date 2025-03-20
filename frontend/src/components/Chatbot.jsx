import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import LoadingSpinner from "./LoadingSpinner";
import geminiAPI from "../api/geminiAPI";

const Chatbot = ({ darkMode }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Send message to Gemini API and save to MongoDB
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await geminiAPI(input);
      const updatedMessages = [...newMessages, { text: response, sender: "bot" }];
      setMessages(updatedMessages);

      // Save chat history to MongoDB
      fetch("http://localhost:5000/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input, answer: response }),
      });
    } catch (error) {
      setMessages([...newMessages, { text: "Error fetching response.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-4 rounded-lg shadow-md w-full transition-colors duration-300 
      ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      
      {/* Chat History */}
      <div className="h-96 overflow-y-auto p-2 border-b">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end"
                : darkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}
        {loading && <LoadingSpinner />}
      </div>

      {/* Input Box */}
      <div className="flex mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`flex-grow p-2 border rounded-l transition-colors duration-300
          ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-black border-gray-300"}`}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
