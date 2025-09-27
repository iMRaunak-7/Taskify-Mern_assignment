import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: "📊",
      title: "Progress Tracking",
      description: "Visual progress bars and completion statistics",
      color: "#667eea",
    },
    {
      icon: "🎯",
      title: "Priority Management",
      description: "Color-coded priority levels for quick identification",
      color: "#ff6b6b",
    },
    {
      icon: "👥",
      title: "Team Collaboration",
      description: "Assign tasks to team members and track progress",
      color: "#4ecdc4",
    },
    {
      icon: "🚀",
      title: "Bulk Assignment",
      description: "Assign tasks to all employees with one click",
      color: "#feca57",
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Works seamlessly on desktop and mobile devices",
      color: "#48dbfb",
    },
    {
      icon: "🔒",
      title: "Role-Based Access",
      description: "Secure admin and employee dashboards",
      color: "#ff9ff3",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="home-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">✨</span>
            <span>Taskify - Modern Task Management</span>
          </div>
          <h1 className="hero-title">
            Streamline Your
            <span className="gradient-text"> Workflow</span>
          </h1>
          <p className="hero-description">
            Manage tasks efficiently with intelligent prioritization, team
            collaboration, and real-time progress tracking. Built for modern
            teams.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Efficient</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Available</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Scalable</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card card-1">
            <div className="card-header">
              <div className="card-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="card-content">
              <div className="task-item completed">
                <span className="task-icon">✅</span>
                <span>Complete project proposal</span>
              </div>
              <div className="task-item in-progress">
                <span className="task-icon">🔄</span>
                <span>Review team feedback</span>
              </div>
              <div className="task-item pending">
                <span className="task-icon">📋</span>
                <span>Schedule team meeting</span>
              </div>
            </div>
          </div>
          <div className="floating-card card-2">
            <div className="progress-ring">
              <div className="progress-circle">
                <span className="progress-text">75%</span>
              </div>
            </div>
            <div className="progress-label">Team Progress</div>
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="role-selection">
        <div className="section-header">
          <h2>Choose Your Dashboard</h2>
          <p>Select your role to access the appropriate features</p>
        </div>

        <div className="role-cards">
          <div className="role-card admin-card">
            <div className="card-glow"></div>
            <div className="role-icon">👑</div>
            <div className="role-content">
              <h3>Admin Dashboard</h3>
              <p>
                Full control over task management, team oversight, and analytics
              </p>
              <ul className="role-features">
                <li>Create and assign tasks</li>
                <li>Bulk assignment to all employees</li>
                <li>Progress monitoring</li>
                <li>User management</li>
              </ul>
            </div>
            <div className="role-actions">
              <button
                onClick={() => navigate("/admin/login")}
                className="btn admin-btn"
              >
                <span className="btn-icon">🚀</span>
                Admin Login
              </button>
              <button
                onClick={() => navigate("/admin/signup")}
                className="btn btn-outline"
              >
                Create Account
              </button>
            </div>
          </div>

          <div className="role-card employee-card">
            <div className="card-glow"></div>
            <div className="role-icon">👤</div>
            <div className="role-content">
              <h3>Employee Dashboard</h3>
              <p>Focus on your tasks with a clean, intuitive interface</p>
              <ul className="role-features">
                <li>View assigned tasks</li>
                <li>Update task status</li>
                <li>Track personal progress</li>
                <li>Priority management</li>
              </ul>
            </div>
            <div className="role-actions">
              <button
                onClick={() => navigate("/employee/login")}
                className="btn employee-btn"
              >
                <span className="btn-icon">💼</span>
                Employee Login
              </button>
              <button
                onClick={() => navigate("/employee/signup")}
                className="btn btn-outline"
              >
                Join Team
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="section-header">
          <h2>Powerful Features</h2>
          <p>Everything you need to manage tasks effectively</p>
        </div>

        <div className="features-showcase">
          <div className="feature-highlight">
            <div
              className="feature-card active"
              style={{ backgroundColor: features[currentFeature].color }}
            >
              <div className="feature-icon">
                {features[currentFeature].icon}
              </div>
              <h3>{features[currentFeature].title}</h3>
              <p>{features[currentFeature].description}</p>
            </div>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-item ${
                  index === currentFeature ? "active" : ""
                }`}
                onClick={() => setCurrentFeature(index)}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>
            Join thousands of teams already using Taskify to streamline their
            workflow
          </p>
          <div className="cta-buttons">
            <button
              onClick={() => navigate("/admin/signup")}
              className="btn cta-btn primary"
            >
              Start as Admin
            </button>
            <button
              onClick={() => navigate("/employee/signup")}
              className="btn cta-btn secondary"
            >
              Join as Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
