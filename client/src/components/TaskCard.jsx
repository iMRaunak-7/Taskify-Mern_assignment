import React, { useState } from "react";
import { format } from "date-fns";

function TaskCard({
  task,
  onUpdate,
  onDelete,
  onStatusChange,
  onPriorityChange,
  isAdmin,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd") : "",
    priority: task.priority,
    assignedTo: task.assignedTo?._id || "",
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#ff4757";
      case "medium":
        return "#ffa502";
      case "low":
        return "#2ed573";
      default:
        return "#747d8c";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#2ed573";
      case "in-progress":
        return "#ffa502";
      case "pending":
        return "#ff4757";
      default:
        return "#747d8c";
    }
  };

  const handleStatusChange = (newStatus) => {
    if (onStatusChange) {
      onStatusChange(task._id, newStatus);
    }
  };

  const handlePriorityChange = (newPriority) => {
    if (onPriorityChange) {
      onPriorityChange(task._id, newPriority);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(task._id, editData);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd") : "",
      priority: task.priority,
      assignedTo: task.assignedTo?._id || "",
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(task._id);
    }
  };

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "completed";

  return (
    <div className={`task-card ${isOverdue ? "overdue" : ""}`}>
      <div className="task-header">
        <div
          className="task-priority"
          style={{ backgroundColor: getPriorityColor(task.priority) }}
        >
          {task.priority.toUpperCase()}
        </div>
        <div
          className="task-status"
          style={{ backgroundColor: getStatusColor(task.status) }}
        >
          {task.status.replace("-", " ").toUpperCase()}
        </div>
      </div>

      {isEditing ? (
        <div className="task-edit-form">
          <input
            type="text"
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
            className="edit-input"
            placeholder="Task title"
          />
          <textarea
            value={editData.description}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
            className="edit-textarea"
            placeholder="Task description"
            rows="3"
          />
          <input
            type="date"
            value={editData.dueDate}
            onChange={(e) =>
              setEditData({ ...editData, dueDate: e.target.value })
            }
            className="edit-input"
          />
          <div className="edit-actions">
            <button onClick={handleSave} className="save-btn">
              Save
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-content">
            <h3 className="task-title">{task.title}</h3>
            <p className="task-description">{task.description}</p>

            {task.dueDate && (
              <div className={`task-due-date ${isOverdue ? "overdue" : ""}`}>
                📅 Due: {format(new Date(task.dueDate), "MMM dd, yyyy")}
                {isOverdue && <span className="overdue-text"> (Overdue)</span>}
              </div>
            )}

            {task.assignedTo && (
              <div className="task-assigned">
                {task.isAssignedToAll ? (
                  <>
                    👥 Assigned to: {task.assignedTo.name}
                    <span className="assigned-to-all-badge">
                      {" "}
                      (Company-wide)
                    </span>
                  </>
                ) : (
                  <>👤 Assigned to: {task.assignedTo.name}</>
                )}
              </div>
            )}

            {task.createdBy && (
              <div className="task-created">
                Created by: {task.createdBy.name}
              </div>
            )}
          </div>

          <div className="task-actions">
            {task.status === "pending" && (
              <button
                onClick={() => handleStatusChange("in-progress")}
                className="action-btn in-progress-btn"
              >
                Start Task
              </button>
            )}

            {task.status === "in-progress" && (
              <button
                onClick={() => handleStatusChange("completed")}
                className="action-btn complete-btn"
              >
                Mark Complete
              </button>
            )}

            {task.status === "completed" && (
              <button
                onClick={() => handleStatusChange("in-progress")}
                className="action-btn reopen-btn"
              >
                Reopen
              </button>
            )}

            {isAdmin && (
              <>
                <button onClick={handleEdit} className="action-btn edit-btn">
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="action-btn delete-btn"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default TaskCard;
