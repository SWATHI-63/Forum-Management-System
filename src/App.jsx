import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/contexts/AuthContext.jsx';
import { NotificationProvider } from './components/contexts/NotificationContext.jsx';
import { ThemeProvider } from './components/contexts/ThemeContext.jsx';
import PrivateRoute from './components/common/PrivateRoute.jsx';
import AdminRoute from './components/common/AdminRoute.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';

// Auth Components
import Login from './components/authentication/Login.jsx';
import Register from './components/authentication/Register.jsx';

// User Components
import Home from './components/pages/Home.jsx';
import UserProfile from './components/user/UserProfile.jsx';
import EditProfile from './components/user/EditProfile.jsx';
import UserDashboard from './components/user/UserDashboard.jsx';

// Forum Components
import Categories from './components/forum/Categories.jsx';
import ThreadList from './components/forum/ThreadList.jsx';
// import PostDetail from './components/forum/PostDetail.jsx';
import CreatePost from './components/forum/CreatePost.jsx';
// import SearchResults from './components/forum/SearchResults.jsx';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard.jsx';
// import UserManagement from './components/admin/UserManagement.jsx';
// import CategoryManagement from './components/admin/CategoryManagement.jsx';
// import PostModeration from './components/admin/PostModeration.jsx';
// import ReportManagement from './components/admin/ReportManagement.jsx';

import './App.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <div className="App">
              <Navbar />
              <main className="main-content">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/category/:categoryId/threads" element={<ThreadList />} />
                {/* <Route path="/post/:postId" element={<PostDetail />} /> */}
                {/* <Route path="/search" element={<SearchResults />} /> */}
                <Route path="/user/:userId" element={<UserProfile />} />

                {/* Protected User Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <UserDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile/edit"
                  element={
                    <PrivateRoute>
                      <EditProfile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/post/create"
                  element={
                    <PrivateRoute>
                      <CreatePost />
                    </PrivateRoute>
                  }
                />

                {/* Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                {/* <Route
                  path="/admin/users"
                  element={
                    <AdminRoute>
                      <UserManagement />
                    </AdminRoute>
                  }
                /> */}
                {/* <Route
                  path="/admin/categories"
                  element={
                    <AdminRoute>
                      <CategoryManagement />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/posts"
                  element={
                    <AdminRoute>
                      <PostModeration />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/reports"
                  element={
                    <AdminRoute>
                      <ReportManagement />
                    </AdminRoute>
                  }
                /> */}

                {/* Catch all - 404 */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </NotificationProvider>
      </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
