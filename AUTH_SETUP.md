# Authentication Setup Guide

## 🔐 JWT Authentication System

Your dashboard now has a complete JWT-based authentication system integrated with the backend.

## 📁 Files Created

### **Services:**
- `src/services/axios.ts` - Global axios instance with JWT interceptors
- `src/services/authService.ts` - Authentication service (login/logout)
- `src/services/api.ts` - Updated contract service with auth

### **Context:**
- `src/context/AuthContext.tsx` - Global auth state management

### **Components:**
- `src/pages/Login.tsx` - Login page
- `src/components/ProtectedRoute.tsx` - Route protection wrapper

## 🚀 How to Use

### **1. Wrap App with AuthProvider**

Update `src/main.tsx`:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
```

### **2. Update App.tsx with Routes**

```tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
// Import your existing pages
import Dashboard from './pages/Dashboard';
import Contracts from './pages/Contracts';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contracts"
          element={
            <ProtectedRoute>
              <Contracts />
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### **3. Add Logout Button**

In any component:

```tsx
import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header>
      <h1>Welcome, {user?.username}!</h1>
      <button onClick={logout}>Logout</button>
    </header>
  );
}
```

### **4. Use Contract Service**

```tsx
import { contractService } from '../services/api';

// Get all contracts (requires authentication)
const contracts = await contractService.getAll();

// Get specific contract (requires authentication)
const contract = await contractService.getById('contract_id');

// Create contract (public)
const result = await contractService.create({
  fullName: 'John Doe',
  phoneNumber: '09123456789',
  position: 'Manager',
  businessName: 'OTAS',
  agreed: true,
  plan: 'premium',
  startDate: '2024-01-15',
  signature: 'data:image/png;base64,...' // optional
});
```

## 🔧 Features

### **Automatic Token Management:**
- ✅ Token stored in localStorage
- ✅ Auto-attached to all API requests
- ✅ Auto-redirect on 401/403 errors
- ✅ Token validation on app load

### **Global Error Handling:**
- ✅ Network errors
- ✅ Authentication errors (401/403)
- ✅ Server errors (500)
- ✅ Not found errors (404)

### **Protected Routes:**
- ✅ Automatic redirect to login if not authenticated
- ✅ Loading state while checking auth
- ✅ Preserve intended route after login

## 🔑 Default Credentials

```
Username: admin
Password: admin123
```

## 🌐 API Configuration

Update API URL in `src/services/axios.ts`:

```typescript
// For production
const API_URL = 'https://your-backend.vercel.app/api';

// For local development
const API_URL = 'http://localhost:5000/api';
```

## 📊 Auth Context API

```typescript
const {
  user,              // Current user object
  loading,           // Loading state
  login,             // Login function
  logout,            // Logout function
  isAuthenticated    // Boolean auth status
} = useAuth();
```

## 🔒 Security Features

1. **JWT Token:** Stored in localStorage
2. **Auto Logout:** On token expiration or invalid token
3. **Protected Routes:** Require authentication
4. **Request Interceptors:** Auto-attach token to requests
5. **Response Interceptors:** Handle auth errors globally

## 🧪 Testing

### **Login Flow:**
1. Navigate to `/login`
2. Enter credentials (admin/admin123)
3. Click Login
4. Redirected to dashboard
5. Token stored and attached to requests

### **Protected Route:**
1. Try accessing `/contracts` without login
2. Auto-redirected to `/login`
3. After login, access granted

### **Logout:**
1. Click logout button
2. Token cleared
3. Redirected to login

## 🚨 Error Handling

All API errors are handled globally:

```typescript
// 401 Unauthorized - Auto logout and redirect
// 403 Forbidden - Auto logout and redirect
// 404 Not Found - Console error
// 500 Server Error - Console error
// Network Error - Console error
```

## 📝 TypeScript Types

```typescript
interface User {
  id: string;
  username: string;
  role: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface Contract {
  _id?: string;
  fullName: string;
  phoneNumber: string;
  position: string;
  businessName: string;
  signature?: string;
  agreed: boolean;
  plan: string;
  startDate: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}
```

## ✅ Complete Setup Checklist

- [x] Axios instance with interceptors
- [x] Auth service (login/logout)
- [x] Auth context provider
- [x] Login page component
- [x] Protected route wrapper
- [x] Updated API service
- [ ] Wrap app with AuthProvider (in main.tsx)
- [ ] Add routes in App.tsx
- [ ] Add logout button to header/navbar
- [ ] Test login flow
- [ ] Test protected routes
- [ ] Test logout

Your authentication system is ready! Just complete the integration steps above.
