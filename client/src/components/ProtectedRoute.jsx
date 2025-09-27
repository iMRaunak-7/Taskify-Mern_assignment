import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, requiredRole = null }) {
  const { user } = useAuth();

  console.log("ProtectedRoute - user:", user);
  console.log("ProtectedRoute - requiredRole:", requiredRole);

  // If no user is logged in, redirect to appropriate login
  if (!user) {
    console.log("No user, redirecting to login");
    if (requiredRole === "admin") {
      return <Navigate to="/admin/login" replace />;
    } else if (requiredRole === "user") {
      return <Navigate to="/employee/login" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // If user role doesn't match required role
  if (requiredRole && user.role !== requiredRole) {
    console.log(
      "Role mismatch - user role:",
      user.role,
      "required:",
      requiredRole
    );
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === "user") {
      return <Navigate to="/employee/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  console.log("Access granted");
  return children;
}

export default ProtectedRoute;
