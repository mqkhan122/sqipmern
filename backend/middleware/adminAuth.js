

// middleware/adminAuth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded; // contains id and role
    next();
  } catch (err) {
    console.log("❌ Invalid Token Error:", err.message);
    res.status(403).json({ message: "Invalid token" });
  }
};

// ✅ Role Checker
const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Access denied: Insufficient role" });
    }
    next();
  };
};

module.exports = { auth, checkRole };


