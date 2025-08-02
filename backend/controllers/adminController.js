
// controllers/adminController.js
const User = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createDefaultAdmin = async () => {
  const defaultEmail = "admin@gmail.com";
  const defaultPassword = "admin@123";

  try {
    const existingAdmin = await User.findOne({ email: defaultEmail, role: "admin" });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      const newAdmin = new User({
        name: "Default Admin",
        email: defaultEmail,
        password: hashedPassword,
        role: "admin",
      });

      await newAdmin.save();
      console.log("✅ Default admin created");
    } else {
      console.log("ℹ️ Default admin already exists");
    }
  } catch (err) {
    console.log("❌ Error creating default admin:", err.message);
  }
};

// ✅ Register User (Admin/User both)
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({success:true, message: "User registered successfully", role: newUser.role });
  } catch (err) {
    res.status(500).json({success:false, message: "Error registering user", error: err.message });
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, "secretKey", { expiresIn: '1h' });
    console.log("🔐 New token generated for:", user.email, "Token:", token);

    // ✅ Send only ONE response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      role: user.role
    });

  } catch (err) {
    console.log("❌ Login error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { register, login, createDefaultAdmin };
