const User = require("../models/User");

// ================= SIGN UP =================

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check whether user already exists
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(200).json({
        message: "User already exists",
        user: existingUser,
      });
    }

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      message: "Account created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= SIGN IN =================

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check password
    if (user.password !== password) {
      return res.status(400).json({
        message: "Incorrect Password",
      });
    }

    res.status(200).json({
      message: "Login Successful",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= EXPORT =================

module.exports = {
  signup,
  login,
};
