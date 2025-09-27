# Task Management System

A comprehensive task management system with role-based access control, featuring separate dashboards for administrators and employees.

## Features

### 🔐 Authentication System

- **Separate Login/Signup Pages**: Dedicated authentication for admins and employees
- **Role-based Access Control**: Different permissions for admin and employee users
- **Secure JWT Authentication**: Token-based authentication with role verification

### 👑 Admin Dashboard

- **Task Management**: Create, edit, delete, and assign tasks
- **User Management**: Add, edit, and remove employee accounts
- **Progress Tracking**: Visual progress bars and completion statistics
- **Task Assignment**: Assign tasks to specific employees
- **Priority Management**: Set and change task priorities (High, Medium, Low)
- **Status Tracking**: Monitor task status (Pending, In Progress, Completed)

### 👤 Employee Dashboard

- **Assigned Tasks**: View tasks assigned to the logged-in employee
- **Status Updates**: Mark tasks as in-progress or completed
- **Progress Overview**: Personal task statistics and completion rates
- **Task Filtering**: Filter tasks by status and priority

### 🎨 User Interface

- **Modern Design**: Clean, aesthetic interface with gradient backgrounds
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Task Cards**: Beautiful card-based task display with color-coded priorities
- **Progress Visualization**: Interactive progress bars and statistics
- **Confirmation Dialogs**: Safe deletion with confirmation prompts

### 📊 Progress Tracking

- **Completion Rates**: Visual progress bars showing task completion
- **Priority Distribution**: Charts showing task distribution by priority
- **Status Overview**: Real-time status updates and statistics
- **Overdue Alerts**: Visual indicators for overdue tasks

## Technology Stack

### Frontend

- **React 19**: Modern React with hooks and context
- **React Router**: Client-side routing
- **React Hook Form**: Form handling and validation
- **Axios**: HTTP client for API calls
- **Date-fns**: Date manipulation and formatting
- **React Beautiful DnD**: Drag and drop functionality
- **CSS3**: Modern styling with gradients and animations

### Backend

- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Token authentication
- **Bcryptjs**: Password hashing
- **Express Validator**: Input validation

## Project Structure

```
task-manager/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context
│   │   ├── api/          # API configuration
│   │   └── styles/       # CSS styles
├── server/                # Node.js backend
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── middleware/        # Custom middleware
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd task-manager
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
   Create a `.env` file in the server directory:

   ```env
   MONGO_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your-secret-key
   PORT=5000
   ```

4. **Start the application**

   ```bash
   # Start the server (from server directory)
   npm run dev

   # Start the client (from client directory)
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Usage

### For Administrators

1. Navigate to `/admin/signup` to create an admin account
2. Login at `/admin/login`
3. Access the admin dashboard to:
   - Create and manage tasks
   - Assign tasks to employees
   - Add/remove employee accounts
   - Monitor progress and statistics

### For Employees

1. Navigate to `/employee/signup` to create an employee account
2. Login at `/employee/login`
3. Access the employee dashboard to:
   - View assigned tasks
   - Update task status
   - Track personal progress

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Tasks

- `GET /api/tasks` - Get tasks (with pagination and filters)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get single task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/status` - Update task status
- `PATCH /api/tasks/:id/priority` - Update task priority

### Users (Admin only)

- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Features in Detail

### Task Management

- **Priority Levels**: High (red), Medium (orange), Low (green)
- **Status Tracking**: Pending, In Progress, Completed
- **Due Dates**: Set and track task deadlines
- **Assignment**: Assign tasks to specific employees
- **Drag & Drop**: Move tasks between priority columns

### Progress Tracking

- **Completion Rates**: Percentage of completed tasks
- **Visual Progress Bars**: Animated progress indicators
- **Statistics Dashboard**: Comprehensive task analytics
- **Overdue Alerts**: Visual warnings for overdue tasks

### User Experience

- **Responsive Design**: Mobile-first approach
- **Modern UI**: Gradient backgrounds and smooth animations
- **Intuitive Navigation**: Clear role-based navigation
- **Real-time Updates**: Instant status updates

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt password encryption
- **Role-based Access**: Different permissions for admin/employee
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Cross-origin request security

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.
