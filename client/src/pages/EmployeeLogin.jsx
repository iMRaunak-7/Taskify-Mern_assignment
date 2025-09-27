import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function EmployeeLogin() {
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

      // Check if user is employee
      if (res.data.user.role !== "user") {
        setServerError("Access denied. Employee privileges required.");
        return;
      }

      login(res.data);
      navigate("/employee/dashboard");
    } catch (err) {
      setServerError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Employee Login</h2>
          <p>Access your task dashboard</p>
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

          <button type="submit" className="auth-button employee-button">
            Login as Employee
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <a href="/employee/signup">Sign up here</a>
          </p>
          <p>
            <a href="/admin/login">Admin Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmployeeLogin;
