const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware"); // Ensure you have this

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
    console.log('in authroutes : signup');
  const { name, email, password, admissionNumber, semester, passingYear, branch, currentCourses } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
      admissionNumber,
      semester,
      passingYear,
      branch,
      currentCourses,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



//profile route
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    console.log('in profile route')
    const user = await User.findById(req.user).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ message: "User not found" });
    
    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
