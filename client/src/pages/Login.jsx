import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setServerError("");
      const res = await api.post("/auth/login", data);
      // Example: store JWT in localStorage (adjust for your backend)
      localStorage.setItem("token", res.data.token);
      navigate("/tasks"); // redirect to tasks page
    } catch (err) {
      setServerError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {serverError && <p className="error">{serverError}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <span>{errors.email.message}</span>}

        <label>Password</label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
