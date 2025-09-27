import React from "react";

function ProgressOverview({ tasks }) {
  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(
      (task) => task.status === "completed"
    ).length;
    const inProgress = tasks.filter(
      (task) => task.status === "in-progress"
    ).length;
    const pending = tasks.filter((task) => task.status === "pending").length;

    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, inProgress, pending, completionRate };
  };

  const getPriorityStats = () => {
    const high = tasks.filter((task) => task.priority === "high").length;
    const medium = tasks.filter((task) => task.priority === "medium").length;
    const low = tasks.filter((task) => task.priority === "low").length;

    return { high, medium, low };
  };

  const getOverdueTasks = () => {
    const now = new Date();
    return tasks.filter((task) => {
      if (!task.dueDate || task.status === "completed") return false;
      return new Date(task.dueDate) < now;
    }).length;
  };

  const stats = getTaskStats();
  const priorityStats = getPriorityStats();
  const overdueCount = getOverdueTasks();

  return (
    <div className="progress-overview">
      <h3>Task Overview</h3>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-number">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <div className="stat-number">{stats.inProgress}</div>
            <div className="stat-label">In Progress</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-number">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <h4>Completion Progress</h4>
          <span className="progress-percentage">{stats.completionRate}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${stats.completionRate}%` }}
          ></div>
        </div>
      </div>

      <div className="priority-section">
        <h4>Priority Distribution</h4>
        <div className="priority-stats">
          <div className="priority-item high">
            <span className="priority-label">High Priority</span>
            <span className="priority-count">{priorityStats.high}</span>
          </div>
          <div className="priority-item medium">
            <span className="priority-label">Medium Priority</span>
            <span className="priority-count">{priorityStats.medium}</span>
          </div>
          <div className="priority-item low">
            <span className="priority-label">Low Priority</span>
            <span className="priority-count">{priorityStats.low}</span>
          </div>
        </div>
      </div>

      {overdueCount > 0 && (
        <div className="overdue-alert">
          <div className="alert-icon">⚠️</div>
          <div className="alert-content">
            <strong>
              {overdueCount} overdue task{overdueCount > 1 ? "s" : ""}
            </strong>
            <p>Tasks that are past their due date</p>
          </div>
        </div>
      )}

      <div className="status-distribution">
  <h4>Status Distribution</h4>
  <div className="status-chart">
    <div className="status-bar">
      {/* Completed segment */}
      {stats.completed > 0 && (
        <div
          className="status-segment completed"
          style={{
            width: `${(stats.completed / stats.total) * 100}%`,
          }}
        >
          <span className="segment-label">
            Completed ({stats.completed})
          </span>
        </div>
      )}

      {/* In-Progress segment */}
      {stats.inProgress > 0 && (
        <div
          className="status-segment in-progress"
          style={{
            width: `${(stats.inProgress / stats.total) * 100}%`,
          }}
        >
          <span className="segment-label">
            In Progress ({stats.inProgress})
          </span>
        </div>
      )}

      {/* Pending segment */}
      {stats.pending > 0 && (
        <div
          className="status-segment pending"
          style={{
            width: `${(stats.pending / stats.total) * 100}%`,
          }}
        >
          <span className="segment-label">
            Pending ({stats.pending})
          </span>
        </div>
      )}
    </div>
  </div>
      </div>
    </div>
  );
}

export default ProgressOverview;
