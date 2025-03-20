const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const historyFilePath = path.join(__dirname, "history.json");

router.get("/history", (req, res) => {
  fs.readFile(historyFilePath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading history" });
    res.json(JSON.parse(data));
  });
});

router.post("/saveHistory", (req, res) => {
  fs.readFile(historyFilePath, "utf-8", (err, data) => {
    const history = err ? [] : JSON.parse(data);
    history.push(req.body);

    fs.writeFile(historyFilePath, JSON.stringify(history), (err) => {
      if (err) return res.status(500).json({ error: "Error saving history" });
      res.json({ message: "History saved" });
    });
  });
});

module.exports = router;
