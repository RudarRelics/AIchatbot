const express = require("express");
const cors = require("cors");
const historyRoutes = require("./historyRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use(historyRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
