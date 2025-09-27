# 🔐 Role-Based Authentication System

## Overview

The Task Management System now includes comprehensive role-based authentication with separate access levels for administrators and employees.

## 🎯 **Authentication Levels**

### **Admin Role (`admin`)**

- **Full System Access**: Create, read, update, delete all tasks
- **User Management**: Add, edit, remove employee accounts
- **Task Assignment**: Assign tasks to any employee
- **Priority Management**: Set and change task priorities
- **Progress Monitoring**: View all tasks and progress statistics

### **Employee Role (`user`)**

- **Assigned Tasks Only**: View only tasks assigned to them
- **Status Updates**: Mark tasks as in-progress or completed
- **Personal Progress**: Track their own task completion
- **Limited Actions**: Cannot create, delete, or assign tasks

## 🛡️ **Security Features**

### **Backend Protection**

```javascript
// Admin-only routes
router.post("/tasks", adminAuth, ...);           // Create tasks
router.delete("/tasks/:id", adminAuth, ...);     // Delete tasks
router.get("/users", adminAuth, ...);            // Manage users

// Employee-restricted routes
router.get("/tasks", auth, ...);                 // View assigned tasks only
router.patch("/tasks/:id/status", auth, ...);    // Update status only
```

### **Frontend Protection**

```javascript
// Protected routes with role requirements
<Route path="/admin/dashboard" element={
  <ProtectedRoute requiredRole="admin">
    <AdminDashboard />
  </ProtectedRoute>
} />

<Route path="/employee/dashboard" element={
  <ProtectedRoute requiredRole="user">
    <EmployeeDashboard />
  </ProtectedRoute>
} />
```

## 🔄 **Authentication Flow**

### **1. User Registration/Login**

```
Admin Signup → /admin/signup → Role: "admin"
Employee Signup → /employee/signup → Role: "user"
```

### **2. Role-Based Redirects**

```
Admin Login → /admin/dashboard
Employee Login → /employee/dashboard
Unauthorized → Redirect to appropriate login
```

### **3. API Access Control**

```
Admin Token → Full API access
Employee Token → Limited API access (assigned tasks only)
Invalid Token → 401 Unauthorized
```

## 📋 **API Endpoints by Role**

### **Admin Endpoints**

- `POST /api/tasks` - Create tasks
- `PUT /api/tasks/:id` - Update any task
- `DELETE /api/tasks/:id` - Delete tasks
- `PATCH /api/tasks/:id/priority` - Change priority
- `GET /api/users` - List all users
- `POST /api/users` - Create users
- `PUT /api/users/:id` - Update users
- `DELETE /api/users/:id` - Delete users

### **Employee Endpoints**

- `GET /api/tasks` - View assigned tasks only
- `PATCH /api/tasks/:id/status` - Update task status
- `GET /api/tasks/:id` - View task details

## 🎨 **UI/UX Features**

### **Role-Based Navigation**

- **Admin**: Access to Admin Dashboard, User Management
- **Employee**: Access to My Tasks, Personal Progress
- **Unauthenticated**: Login options for both roles

### **Dashboard Differences**

- **Admin Dashboard**: Full task management, user management, progress overview
- **Employee Dashboard**: Assigned tasks only, personal statistics

## 🚀 **Setup Instructions**

### **1. Install Dependencies**

```bash
# Run the setup script
setup.bat

# Or manually:
npm install
cd server && npm install && cd ..
cd client && npm install --legacy-peer-deps && cd ..
```

### **2. Configure Environment**

```env
# server/.env
MONGO_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

### **3. Start Application**

```bash
npm start
```

## 🔧 **Testing the System**

### **1. Create Admin Account**

1. Go to `http://localhost:5173`
2. Click "Admin Signup"
3. Create admin account
4. Access admin dashboard

### **2. Create Employee Account**

1. Login as admin
2. Go to "Manage Users"
3. Add employee account
4. Test employee login

### **3. Test Role Separation**

1. Login as employee
2. Try to access admin dashboard (should redirect)
3. Login as admin
4. Try to access employee dashboard (should redirect)

## 🛠️ **Middleware Functions**

### **Authentication Middleware**

```javascript
// Basic auth (any logged-in user)
const auth = (req, res, next) => { ... }

// Admin-only auth
const adminAuth = (req, res, next) => { ... }

// Employee-only auth
const employeeAuth = (req, res, next) => { ... }
```

### **Frontend Protection**

```javascript
// Protected route component
<ProtectedRoute requiredRole="admin">
  <AdminDashboard />
</ProtectedRoute>
```

## 🔒 **Security Considerations**

1. **JWT Token Validation**: All API requests validated
2. **Role Verification**: Server-side role checking
3. **Route Protection**: Frontend route guards
4. **Data Filtering**: Employees see only assigned tasks
5. **Action Restrictions**: Role-based action limitations

## 📊 **Database Schema**

### **User Model**

```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  role: String (enum: ["admin", "user"]),
  timestamps: true
}
```

### **Task Model**

```javascript
{
  title: String,
  description: String,
  status: String (enum: ["pending", "in-progress", "completed"]),
  priority: String (enum: ["low", "medium", "high"]),
  assignedTo: ObjectId (ref: User),
  createdBy: ObjectId (ref: User),
  dueDate: Date,
  timestamps: true
}
```

## 🎯 **Key Benefits**

1. **Secure Access Control**: Role-based permissions
2. **Data Isolation**: Employees see only their tasks
3. **Admin Control**: Full system management
4. **Scalable Architecture**: Easy to add new roles
5. **User Experience**: Role-appropriate interfaces

## 🚨 **Troubleshooting**

### **Common Issues**

1. **401 Unauthorized**: Check JWT token in localStorage
2. **403 Forbidden**: Verify user role matches required role
3. **Redirect Loops**: Check ProtectedRoute configuration
4. **API Errors**: Verify middleware order and role checks

### **Debug Steps**

1. Check browser console for errors
2. Verify JWT token in localStorage
3. Check server logs for authentication errors
4. Test API endpoints with proper headers

This role-based authentication system provides secure, scalable access control for the Task Management System.

