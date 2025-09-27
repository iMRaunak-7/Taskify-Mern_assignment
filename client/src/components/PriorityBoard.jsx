import React from "react";
import api from "../api/axios";

export default function PriorityBoard({ onChange }) {
  const [cols, setCols] = React.useState({ high: [], medium: [], low: [] });

  const fetch = async () => {
    const res = await api.get("/tasks?limit=100");
    const grouped = { high: [], medium: [], low: [] };
    res.data.data.forEach((t) => {
      grouped[t.priority || "medium"].push(t);
    });
    setCols(grouped);
  };

  React.useEffect(() => {
    fetch();
  }, []);

  const handlePriorityChange = async (taskId, newPriority) => {
    await api.patch(`/tasks/${taskId}/priority`, { priority: newPriority });
    await fetch();
    if (onChange) onChange();
  };

  const column = (id, items) => (
    <div
      style={{
        minHeight: 200,
        padding: 16,
        border: "1px solid #e1e8ed",
        margin: 8,
        borderRadius: 12,
        background: "#f8f9fa",
      }}
    >
      <h4 style={{ marginBottom: 16, color: "#2c3e50" }}>
        {id.toUpperCase()} PRIORITY
      </h4>
      {items.map((task) => (
        <div
          key={task._id}
          style={{
            padding: 12,
            marginBottom: 8,
            background: "#fff",
            border: "1px solid #e1e8ed",
            borderRadius: 8,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <strong style={{ display: "block", marginBottom: 4 }}>
            {task.title}
          </strong>
          <div style={{ fontSize: 12, color: "#7f8c8d" }}>
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No due date"}
          </div>
          <div style={{ marginTop: 8 }}>
            <select
              value={task.priority}
              onChange={(e) => handlePriorityChange(task._id, e.target.value)}
              style={{
                padding: "4px 8px",
                border: "1px solid #e1e8ed",
                borderRadius: 4,
                fontSize: 12,
              }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {column("high", cols.high)}
      {column("medium", cols.medium)}
      {column("low", cols.low)}
    </div>
  );
}
