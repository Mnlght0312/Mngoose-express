const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = 9000;
const User = require("./models/user.models");

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://Mnlght0312:RoH3Kb7ZbhAiYIvn@cluster0.bl2xixp.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Database connection error:", error);
  });

// Register endpoint
app.post("/register", async (request, response) => {
  try {
    const { email, password } = request.body;

    // Check if username already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return response.status(400).send("Username already exists");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user object
    const user = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const result = await user.save();
    if (result) {
      response.status(201).send({
        message: "User Created Succesfully",
        result,
      });
    } else {
      response.status(500).send({
        message: "Error creating user",
      });
    }

    // res.send("Registration successful!");
  } catch (error) {
    console.error("Error:", error);
    response.status(500).send("Internal Server Error");
  }
});

// Start the server on port 900

app.listen(PORT, () => {
  console.log(`Express Application is running on http://localhost:${PORT}`);
});
