# 🚀 Taskify - Modern Task Management System

A full-stack task management application built with React, Node.js, and MongoDB. Features role-based authentication, bulk task assignment, and real-time progress tracking.

![Taskify Dashboard](https://img.shields.io/badge/Status-Live-green)
![React](https://img.shields.io/badge/React-18.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.0-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

## ✨ Features

### 🎯 **Core Functionality**
- **Role-Based Access Control** - Separate admin and employee dashboards
- **Task Management** - Create, assign, update, and delete tasks
- **Priority System** - High, medium, and low priority levels with color coding
- **Progress Tracking** - Visual progress bars and completion statistics
- **Bulk Assignment** - Assign tasks to all employees with one click
- **Real-time Updates** - Live task status updates across the platform

### 🔐 **Authentication & Security**
- JWT-based authentication
- Role-based authorization (Admin/Employee)
- Secure password hashing with bcrypt
- Protected routes and API endpoints

### 🎨 **User Experience**
- Modern, responsive design
- Interactive dashboard with animations
- Mobile-friendly interface
- Intuitive task management workflow

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form management
- **CSS3** - Custom styling with animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/taskify.git
   cd taskify
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment template
   cd server
   cp env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskify
   JWT_SECRET=your-super-secret-jwt-key
   ```

4. **Start the application**
   ```bash
   # Start server (from server directory)
   npm start
   
   # Start client (from client directory)
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📱 Usage

### Admin Dashboard
- Create and manage tasks
- Assign tasks to individual employees or all employees
- Monitor team progress
- Manage user accounts
- View analytics and reports

### Employee Dashboard
- View assigned tasks
- Update task status (Pending → In Progress → Completed)
- Track personal progress
- Manage task priorities

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Tasks
- `GET /api/tasks` - Get all tasks (with filters)
- `POST /api/tasks` - Create new task (Admin only)
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task (Admin only)
- `PATCH /api/tasks/:id/status` - Update task status
- `PATCH /api/tasks/:id/priority` - Update task priority (Admin only)

### Users
- `GET /api/users` - Get all users (Admin only)
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

## 🌐 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Set environment variables for API URL

### Backend Deployment (Railway/Heroku)
1. Connect your GitHub repository
2. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT`
3. Deploy automatically on push

## 📁 Project Structure

```
taskify/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context
│   │   ├── api/          # API configuration
│   │   └── styles/       # CSS styles
│   └── package.json
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   ├── models/           # Database models
│   ├── middleware/       # Custom middleware
│   └── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the database solution
- All contributors and testers

---

⭐ **Star this repository if you found it helpful!**