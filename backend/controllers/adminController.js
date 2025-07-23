// // controllers/adminController.js
// const Admin = require('../models/adminModel');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken')

// // ✅ Default Admin Creator
// const createDefaultAdmin = async () => {
//   const defaultEmail = "admin@gmail.com";
//   const defaultPassword = "admin@123";

//   try {
//     const existingAdmin = await Admin.findOne({ email: defaultEmail });

//     if (!existingAdmin) {
//       const hashedPassword = await bcrypt.hash(defaultPassword, 10);
//       const newAdmin = new Admin({ email: defaultEmail, password: hashedPassword });
//       await newAdmin.save();
//       console.log("✅ Default admin created");
//     } else {
//       console.log("ℹ️ Default admin already exists");
//     }
//   } catch (err) {
//     console.log("❌ Error creating default admin:", err.message);
//   }
// };

// // ✅ Admin Login Handler
// const adminLogin = async (req, res) => {
//   const { email, password } = req.body;
//   console.log("➡️ Login request received:", email);

//   try {
//     const admin = await Admin.findOne({ email });
//     if (!admin) return res.json({ success: false, message: "Admin not found" });

//     const passMatch = await bcrypt.compare(password, admin.password);
//     if (!passMatch) return res.json({ success: false, message: "Invalid password" });

//     console.log("Admin logged in successfully");
//     const token = jwt.sign({ id: admin._id }, "secretKey", {
//     expiresIn: "3m", // 1 din ke liye token valid
//     });

//     res.json({
//       success: true,
//       message: "Login successful",
//       token,
//     });
    
//   } catch (error) {
//     console.log("❌ Login error:", error.message);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// module.exports = { createDefaultAdmin, adminLogin };


//  ========================================================

// controllers/authController.js
const User = require("../models/adminModel"); // 👈 use only one model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ✅ Default Admin Creator
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

// ✅ Login Handler (Admin + User)
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("➡️ Login request received:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) return res.json({ success: false, message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secretKey", // 🔒 replace with process.env.JWT_SECRET in real app
      { expiresIn: "1d" }
    );

    console.log(`${user.role} logged in successfully`);
    res.json({
      success: true,
      message: "Login successful",
      token,
      role: user.role,
      name: user.name,
    });
  } catch (error) {
    console.log("❌ Login error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user", // 👈 default role
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



module.exports = {
  createDefaultAdmin,
  login,
  register
};
