// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Token malformed" });
  }

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded; // 👈 will contain id and role
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = auth;
