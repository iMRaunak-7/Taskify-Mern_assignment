import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import UserManagement from "../components/UserManagement";
import ProgressOverview from "../components/ProgressOverview";

function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    assignedTo: "",
  });

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, [user]);

  const fetchTasks = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append("status", filters.status);
      if (filters.priority) params.append("priority", filters.priority);
      if (filters.assignedTo) params.append("assignedTo", filters.assignedTo);

      const response = await api.get(`/tasks?${params.toString()}`);
      setTasks(response.data.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await api.post("/tasks", taskData);

      // Handle different response formats
      if (response.data.assignedToAll) {
        console.log(`Task assigned to all employees: ${response.data.message}`);
        // Show success message for bulk assignment
        alert(`✅ ${response.data.message}`);
      }

      fetchTasks();
      setShowTaskForm(false);
    } catch (error) {
      console.error("Error creating task:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      await api.put(`/tasks/${taskId}`, updates);
      fetchTasks();
      setSelectedTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.delete(`/tasks/${taskId}`);
        fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const handleStatusChange = async (taskId, status) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, { status });
      fetchTasks();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handlePriorityChange = async (taskId, priority) => {
    try {
      await api.patch(`/tasks/${taskId}/priority`, { priority });
      fetchTasks();
    } catch (error) {
      console.error("Error updating priority:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <div className="header-actions">
            <span className="user-info">Welcome, {user?.name}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-sidebar">
          <nav className="sidebar-nav">
            <button
              className={`nav-btn ${
                !showTaskForm && !showUserManagement ? "active" : ""
              }`}
              onClick={() => {
                setShowTaskForm(false);
                setShowUserManagement(false);
              }}
            >
              📊 Overview
            </button>
            <button
              className={`nav-btn ${showTaskForm ? "active" : ""}`}
              onClick={() => {
                setShowTaskForm(true);
                setShowUserManagement(false);
              }}
            >
              ➕ Create Task
            </button>
            <button
              className={`nav-btn ${showUserManagement ? "active" : ""}`}
              onClick={() => {
                setShowUserManagement(true);
                setShowTaskForm(false);
              }}
            >
              👥 Manage Users
            </button>
          </nav>
        </div>

        <div className="dashboard-main">
          {showTaskForm ? (
            <TaskForm
              onSubmit={handleCreateTask}
              users={users}
              onCancel={() => setShowTaskForm(false)}
            />
          ) : showUserManagement ? (
            <UserManagement users={users} onUserUpdate={fetchUsers} />
          ) : (
            <>
              <div className="dashboard-stats">
                <ProgressOverview tasks={tasks} />
              </div>

              <div className="tasks-section">
                <div className="section-header">
                  <h2>Task Management</h2>
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

                    <select
                      value={filters.assignedTo}
                      onChange={(e) =>
                        setFilters({ ...filters, assignedTo: e.target.value })
                      }
                      className="filter-select"
                    >
                      <option value="">All Users</option>
                      {users.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.name}
                        </option>
                      ))}
                    </select>

                    <button onClick={fetchTasks} className="refresh-btn">
                      🔄 Refresh
                    </button>
                  </div>
                </div>

                <div className="tasks-grid">
                  {tasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onUpdate={handleUpdateTask}
                      onDelete={handleDeleteTask}
                      onStatusChange={handleStatusChange}
                      onPriorityChange={handlePriorityChange}
                      isAdmin={true}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
