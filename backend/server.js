const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Chat Schema & Model
const chatSchema = new mongoose.Schema({
  question: String,
  answer: String,
  timestamp: { type: Date, default: Date.now },
});

const Chat = mongoose.model("Chat", chatSchema);

// Save chat history
app.post("/api/history", async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newChat = new Chat({ question, answer });
    await newChat.save();
    res.status(201).json({ message: "Chat saved" });
  } catch (err) {
    res.status(500).json({ error: "Error saving chat" });
  }
});

// Get chat history
app.get("/api/history", async (req, res) => {
  try {
    const chats = await Chat.find().sort({ timestamp: -1 }).limit(20); // Get latest 20 messages
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving history" });
  }
});

// Serve frontend build
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
