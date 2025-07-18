// controllers/adminController.js
const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');

// ✅ Default Admin Creator
const createDefaultAdmin = async () => {
  const defaultEmail = "admin@gmail.com";
  const defaultPassword = "admin@123";

  try {
    const existingAdmin = await Admin.findOne({ email: defaultEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      const newAdmin = new Admin({ email: defaultEmail, password: hashedPassword });
      await newAdmin.save();
      console.log("✅ Default admin created");
    } else {
      console.log("ℹ️ Default admin already exists");
    }
  } catch (err) {
    console.log("❌ Error creating default admin:", err.message);
  }
};

// ✅ Admin Login Handler
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("➡️ Login request received:", email);

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.json({ success: false, message: "Admin not found" });

    const passMatch = await bcrypt.compare(password, admin.password);
    if (!passMatch) return res.json({ success: false, message: "Invalid password" });

    console.log("✅ Admin logged in successfully");
    res.json({ success: true, message: "Login successful", email: admin.email });
  } catch (error) {
    console.log("❌ Login error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { createDefaultAdmin, adminLogin };
