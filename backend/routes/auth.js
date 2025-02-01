const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  try {
      const { username, email, password, firstName, lastName, bio, location, profilePicture } = req.body;

      // Your logic for user registration
      const newUser = new User({
          username,
          email,
          password,
          firstName,
          lastName,
          bio,
          location,
          profilePicture,
      });

      await newUser.save();
      res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
  }
});


// Login User (Uses Username Instead of Email)
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send response with token and user data (excluding password)
    const { password: _, ...userData } = user.toObject(); // Exclude password from response
    res.status(200).json({ token, user: userData });  // Return the rest of the user data
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
