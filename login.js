const express = require("express");
const app = express();

// Parse incoming JSON data
app.use(express.json());

// Create a POST endpoint at /register for user registration
app.post("/register", (req, res) => {
  // Get the user data from the request body
  const { username, password } = req.body;

  // TODO: Implement user registration logic here

  // Send a response indicating successful registration
  res.status(201).json({ message: "User registered successfully" });
});

// Create a POST endpoint at /login for user login
app.post("/login", (req, res) => {
  // Get the user data from the request body
  const { username, password } = req.body;

  // TODO: Implement user login logic here

  // Send a response indicating successful login
  res.json({ message: "User logged in successfully" });
});

// Start the server on port 8090
app.listen(8090, () => {
  console.log("Server started on port 8090");
});
