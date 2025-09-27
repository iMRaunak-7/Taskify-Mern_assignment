// src/pages/Signup.jsx
import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "../api/axios"; // make sure axios.js is in src/api/
import { useNavigate } from "react-router-dom";

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setServerError("");
      // Call backend signup route
      await api.post("/auth/register", data);
      // After signup, redirect to login
      navigate("/login");
    } catch (err) {
      setServerError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {serverError && <p className="error">{serverError}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <span>{errors.name.message}</span>}

        <label>Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <span>{errors.email.message}</span>}

        <label>Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Min length is 6" },
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <label>Confirm Password</label>
        <input
          type="password"
          {...register("confirmPassword", {
            validate: (val) =>
              val === watch("password") || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
