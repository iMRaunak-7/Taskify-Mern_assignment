import React, { useState } from "react";
import { useForm } from "react-hook-form";

function TaskForm({ onSubmit, users = [], onCancel, initialData = null }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
      assignedTo: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="task-form-container">
      <div className="task-form-header">
        <h2>{initialData ? "Edit Task" : "Create New Task"}</h2>
        {onCancel && (
          <button onClick={onCancel} className="close-btn">
            ×
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="form-input"
            placeholder="Enter task title"
          />
          {errors.title && (
            <span className="error-text">{errors.title.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register("description")}
            className="form-textarea"
            placeholder="Enter task description"
            rows="4"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              {...register("dueDate")}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              {...register("priority")}
              className="form-select"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>

        {users.length > 0 && (
          <div className="form-group">
            <label htmlFor="assignedTo">Assign To</label>
            <select
              id="assignedTo"
              {...register("assignedTo")}
              className="form-select"
            >
              <option value="">Select an employee</option>
              <option value="all">👥 All Employees</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Saving..."
              : initialData
              ? "Update Task"
              : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
