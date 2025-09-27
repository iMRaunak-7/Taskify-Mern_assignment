import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      setServerError("");
      const res = await api.post("/auth/login", data);

      // Check if user is admin
      if (res.data.user.role !== "admin") {
        setServerError("Access denied. Admin privileges required.");
        return;
      }

      login(res.data);
      navigate("/admin/dashboard");
    } catch (err) {
      setServerError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Admin Login</h2>
          <p>Access admin dashboard</p>
        </div>

        {serverError && <div className="error-message">{serverError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="form-input"
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="error-text">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="form-input"
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="error-text">{errors.password.message}</span>
            )}
          </div>

          <button type="submit" className="auth-button admin-button">
            Login as Admin
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an admin account?{" "}
            <a href="/admin/signup">Sign up here</a>
          </p>
          <p>
            <a href="/employee/login">Employee Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
