require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const http = require("http");

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(express.json());

// Routes


// Server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
