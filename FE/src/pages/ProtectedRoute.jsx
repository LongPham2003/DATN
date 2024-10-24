import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, requiredRoles }) => {
  const role = localStorage.getItem("userRole");

  // eslint-disable-next-line react/prop-types
  if (!requiredRoles.includes(role)) {
    return <Navigate to="/403" />;
  }

  return children; // Render component con nếu vai trò đúng
};

export default ProtectedRoute;
