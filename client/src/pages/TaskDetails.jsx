// src/pages/TaskDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios"; // updated path


function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    description: "",
    completed: false,
  });

  // Fetch task by ID
  const fetchTask = () => {
    api
      .get(`/tasks/${id}`)
      .then((res) => {
        setTask(res.data);
        setUpdatedTask({
          title: res.data.title,
          description: res.data.description,
          completed: res.data.completed,
        });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  if (!task) return <p>Loading...</p>;

  // Update task
  const handleUpdate = async () => {
    try {
      await api.put(`/tasks/${id}`, updatedTask);
      setEditMode(false);
      fetchTask();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {editMode ? (
        <div>
          <input
            type="text"
            value={updatedTask.title}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, title: e.target.value })
            }
          />
          <input
            type="text"
            value={updatedTask.description}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, description: e.target.value })
            }
          />
          <label>
            Completed:
            <input
              type="checkbox"
              checked={updatedTask.completed}
              onChange={(e) =>
                setUpdatedTask({ ...updatedTask, completed: e.target.checked })
              }
            />
          </label>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <p>Status: {task.completed ? "Completed" : "Pending"}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button onClick={() => navigate("/tasks")}>Back to Tasks</button>
        </div>
      )}
    </div>
  );
}

export default TaskDetails;
