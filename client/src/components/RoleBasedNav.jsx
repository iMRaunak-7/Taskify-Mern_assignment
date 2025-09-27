import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function RoleBasedNav() {
  const { user, logout, isAdmin, isEmployee } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return (
      <nav className="role-nav">
        <div className="nav-brand">Task Manager</div>
        <div className="nav-links">
          <a href="/admin/login">Admin Login</a>
          <a href="/employee/login">Employee Login</a>
        </div>
      </nav>
    );
  }

  return (
    <nav className="role-nav">
      <div className="nav-brand">Task Manager</div>
      <div className="nav-links">
        {isAdmin() && (
          <>
            <a href="/admin/dashboard">Admin Dashboard</a>
            <span className="user-info">Admin: {user.name}</span>
          </>
        )}
        {isEmployee() && (
          <>
            <a href="/employee/dashboard">My Tasks</a>
            <span className="user-info">Employee: {user.name}</span>
          </>
        )}
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default RoleBasedNav;

