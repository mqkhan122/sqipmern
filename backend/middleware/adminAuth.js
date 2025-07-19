const jwt = require('jsonwebtoken');

const authAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(' ')[1]; // ✅ Remove "Bearer "

  if (!token) {
    return res.status(401).json({ message: "Token malformed" });
  }

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authAdmin;
