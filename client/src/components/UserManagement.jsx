import React, { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../api/axios";

function UserManagement({ users, onUserUpdate }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [serverError, setServerError] = useState("");

  const handleAddUser = async (data) => {
    try {
      setServerError("");
      await api.post("/users", { ...data, role: "user" });
      onUserUpdate();
      setIsAddingUser(false);
    } catch (error) {
      setServerError(error.response?.data?.message || "Error adding user");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      try {
        await api.delete(`/users/${userId}`);
        onUserUpdate();
      } catch (error) {
        setServerError(error.response?.data?.message || "Error deleting user");
      }
    }
  };

  const handleEditUser = async (userId, data) => {
    try {
      setServerError("");
      await api.put(`/users/${userId}`, data);
      onUserUpdate();
      setEditingUser(null);
    } catch (error) {
      setServerError(error.response?.data?.message || "Error updating user");
    }
  };

  return (
    <div className="user-management">
      <div className="user-management-header">
        <h2>User Management</h2>
        <button
          onClick={() => setIsAddingUser(true)}
          className="btn btn-primary"
        >
          Add New User
        </button>
      </div>

      {serverError && <div className="error-message">{serverError}</div>}

      {isAddingUser && (
        <div className="user-form-container">
          <div className="user-form-header">
            <h3>Add New User</h3>
            <button
              onClick={() => setIsAddingUser(false)}
              className="close-btn"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit(handleAddUser)} className="user-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className="form-input"
                placeholder="Enter full name"
              />
              {errors.name && (
                <span className="error-text">{errors.name.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className="form-input"
                placeholder="Enter email address"
              />
              {errors.email && (
                <span className="error-text">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="form-input"
                placeholder="Enter password"
              />
              {errors.password && (
                <span className="error-text">{errors.password.message}</span>
              )}
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => setIsAddingUser(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add User
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="users-list">
        <h3>Existing Users</h3>
        <div className="users-grid">
          {users.map((user) => (
            <div key={user._id} className="user-card">
              <div className="user-info">
                <h4>{user.name}</h4>
                <p className="user-email">{user.email}</p>
                <span className={`user-role ${user.role}`}>
                  {user.role === "admin" ? "👑 Admin" : "👤 Employee"}
                </span>
              </div>

              <div className="user-actions">
                <button
                  onClick={() => setEditingUser(user)}
                  className="action-btn edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="action-btn delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit User</h3>
              <button
                onClick={() => setEditingUser(null)}
                className="close-btn"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit((data) =>
                handleEditUser(editingUser._id, data)
              )}
              className="user-form"
            >
              <div className="form-group">
                <label htmlFor="edit-name">Full Name *</label>
                <input
                  type="text"
                  id="edit-name"
                  {...register("name", { required: "Name is required" })}
                  className="form-input"
                  defaultValue={editingUser.name}
                />
                {errors.name && (
                  <span className="error-text">{errors.name.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="edit-email">Email *</label>
                <input
                  type="email"
                  id="edit-email"
                  {...register("email", { required: "Email is required" })}
                  className="form-input"
                  defaultValue={editingUser.email}
                />
                {errors.email && (
                  <span className="error-text">{errors.email.message}</span>
                )}
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
