// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token"); // ✅ Match with your login key

  if (!token) return <Navigate to="/admin" />;

  try {
    // ✅ Decode token payload (base64 decode)
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userRole = payload.role;

    // ✅ Role match
    return allowedRoles.includes(userRole)
      ? children
      : <Navigate to="/unauthorized" />; // optional route for 403

  } catch (err) {
    console.error("❌ Invalid token structure:", err.message);
    return <Navigate to="/admin" />;
  }
};

export default ProtectedRoute;
