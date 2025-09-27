import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function EmployeeSignup() {
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
      const res = await api.post("/auth/register", {
        ...data,
        role: "user",
      });

      console.log("Employee signup response:", res.data);
      console.log("User role:", res.data.user.role);

      login(res.data);
      navigate("/employee/dashboard");
    } catch (err) {
      console.error("Employee signup error:", err.response?.data);
      setServerError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Employee Registration</h2>
          <p>Create your employee account</p>
        </div>

        {serverError && <div className="error-message">{serverError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="form-input"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <span className="error-text">{errors.name.message}</span>
            )}
          </div>

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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="form-input"
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="error-text">{errors.password.message}</span>
            )}
          </div>

          <button type="submit" className="auth-button employee-button">
            Create Employee Account
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <a href="/employee/login">Login here</a>
          </p>
          <p>
            <a href="/admin/signup">Admin Registration</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmployeeSignup;
