import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import TaskCard from "../components/TaskCard";

function EmployeeDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
  });

  useEffect(() => {
    fetchMyTasks();
  }, [user]);

  const fetchMyTasks = async () => {
    try {
      const params = new URLSearchParams();
      params.append("assignedTo", user.id);
      if (filters.status) params.append("status", filters.status);
      if (filters.priority) params.append("priority", filters.priority);

      const response = await api.get(`/tasks?${params.toString()}`);
      setTasks(response.data.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId, status) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, { status });
      fetchMyTasks();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/employee/login");
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(
      (task) => task.status === "completed"
    ).length;
    const inProgress = tasks.filter(
      (task) => task.status === "in-progress"
    ).length;
    const pending = tasks.filter((task) => task.status === "pending").length;

    return { total, completed, inProgress, pending };
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your tasks...</p>
      </div>
    );
  }

  const stats = getTaskStats();

  return (
    <div className="employee-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>My Tasks</h1>
          <div className="header-actions">
            <span className="user-info">Welcome, {user?.name}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="stats-overview">
          <div className="stat-card">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.inProgress}</div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>

        <div className="tasks-section">
          <div className="section-header">
            <h2>Your Assigned Tasks</h2>
            <div className="filters">
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="filter-select"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <select
                value={filters.priority}
                onChange={(e) =>
                  setFilters({ ...filters, priority: e.target.value })
                }
                className="filter-select"
              >
                <option value="">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <button onClick={fetchMyTasks} className="refresh-btn">
                🔄 Refresh
              </button>
            </div>
          </div>

          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No tasks assigned</h3>
              <p>You don't have any tasks assigned to you yet.</p>
            </div>
          ) : (
            <div className="tasks-grid">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onStatusChange={handleStatusChange}
                  isAdmin={false}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
