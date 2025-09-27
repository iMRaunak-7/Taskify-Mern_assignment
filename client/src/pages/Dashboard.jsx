import React from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import PriorityBoard from "../components/PriorityBoard";

export default function Dashboard() {
  const [tasks, setTasks] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const limit = 10;

  const fetchTasks = async (p = 1) => {
    setLoading(true);
    try {
      const res = await api.get(`/tasks?page=${p}&limit=${limit}`);
      setTasks(res.data.data);
      setPage(res.data.page);
      setPages(res.data.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchTasks(1);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <div style={{ marginBottom: 12 }}>
        <Link to="/tasks/new">+ Create Task</Link>
      </div>

      <PriorityBoard onChange={() => fetchTasks(page)} />

      <h3>
        All tasks (page {page} / {pages})
      </h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Due</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t._id}>
                <td>
                  <Link to={`/tasks/${t._id}`}>{t.title}</Link>
                </td>
                <td>
                  {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "-"}
                </td>
                <td>{t.status}</td>
                <td>{t.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={{ marginTop: 12 }}>
        <button disabled={page <= 1} onClick={() => fetchTasks(page - 1)}>
          Prev
        </button>
        <button disabled={page >= pages} onClick={() => fetchTasks(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
