// src/pages/Tasks.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios"; // updated path
import { useNavigate } from "react-router-dom";


function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  // Fetch all tasks
  const fetchTasks = () => {
    api
      .get("/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task
  const handleAddTask = async () => {
    if (!newTask.title || !newTask.description) return alert("Fill all fields");
    try {
      await api.post("/tasks", newTask);
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Tasks List</h1>

      {/* Add new task */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {/* Tasks list */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => navigate(`/tasks/${task._id}`)}
            >
              {task.title}
            </span>
            <button
              onClick={() => handleDeleteTask(task._id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
