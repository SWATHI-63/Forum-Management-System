import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAdminStats } from '../services/adminService.jsx';
import {
  FaUsers,
  FaComments,
  FaFolder,
  FaFlag,
  FaChartLine,
  FaUserShield,
} from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalCategories: 0,
    totalReports: 0,
    activeUsers: 0,
    newUsersToday: 0,
    pendingReports: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-logo-section">
        <svg className="dashboard-logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="dashboardLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <path
            d="M 60 50 Q 40 50 40 70 Q 40 90 60 90 L 80 90 L 80 70 Q 80 50 60 50 Z"
            fill="url(#dashboardLogoGradient)"
            stroke="url(#dashboardLogoGradient)"
            strokeWidth="3"
          />
          <line x1="50" y1="60" x2="70" y2="60" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <line x1="50" y1="75" x2="70" y2="75" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <path
            d="M 110 80 Q 90 80 90 100 Q 90 120 110 120 L 130 120 L 130 100 Q 130 80 110 80 Z"
            fill="url(#dashboardLogoGradient)"
            stroke="url(#dashboardLogoGradient)"
            strokeWidth="3"
          />
          <line x1="100" y1="95" x2="120" y2="95" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <line x1="100" y1="110" x2="120" y2="110" stroke="white" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <h2 className="dashboard-logo-text">CHATTRIX</h2>
      </div>
      <div className="admin-header">
        <h1>
          <FaUserShield /> Admin Dashboard
        </h1>
        <p>Manage your CHATTRIX community and monitor activity</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users">
            <FaUsers />
          </div>
          <div className="stat-details">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
            <small>+{stats.newUsersToday} today</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon posts">
            <FaComments />
          </div>
          <div className="stat-details">
            <h3>{stats.totalPosts}</h3>
            <p>Total Posts</p>
            <small>{stats.activePosts || 0} active</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon categories">
            <FaFolder />
          </div>
          <div className="stat-details">
            <h3>{stats.totalCategories}</h3>
            <p>Categories</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon reports">
            <FaFlag />
          </div>
          <div className="stat-details">
            <h3>{stats.pendingReports}</h3>
            <p>Pending Reports</p>
            <small>{stats.totalReports} total</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon active">
            <FaChartLine />
          </div>
          <div className="stat-details">
            <h3>{stats.activeUsers}</h3>
            <p>Active Users</p>
            <small>Last 24 hours</small>
          </div>
        </div>
      </div>

      <div className="admin-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/admin/users" className="action-card">
            <FaUsers />
            <h3>Manage Users</h3>
            <p>View, block, or delete users</p>
          </Link>

          <Link to="/admin/posts" className="action-card">
            <FaComments />
            <h3>Moderate Posts</h3>
            <p>Approve or delete posts and comments</p>
          </Link>

          <Link to="/admin/categories" className="action-card">
            <FaFolder />
            <h3>Manage Categories</h3>
            <p>Create, edit, or delete categories</p>
          </Link>

          <Link to="/admin/reports" className="action-card">
            <FaFlag />
            <h3>View Reports</h3>
            <p>Handle user reports and complaints</p>
          </Link>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {stats.recentActivity && stats.recentActivity.length > 0 ? (
            stats.recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <span className="activity-time">
                  {new Date(activity.timestamp).toLocaleString()}
                </span>
                <p>{activity.description}</p>
              </div>
            ))
          ) : (
            <p>No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
