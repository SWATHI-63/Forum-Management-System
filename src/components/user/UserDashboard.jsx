import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { getUserPosts, getUserNotifications } from '../services/userService.jsx';
import { FaPlus, FaBell, FaComments, FaHeart } from 'react-icons/fa';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, notificationsData] = await Promise.all([
          getUserPosts(user.user_id),
          getUserNotifications(),
        ]);
        setPosts(postsData);
        setNotifications(notificationsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.user_id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-logo-section">
        <svg className="dashboard-logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="userDashboardLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <path
            d="M 60 50 Q 40 50 40 70 Q 40 90 60 90 L 80 90 L 80 70 Q 80 50 60 50 Z"
            fill="url(#userDashboardLogoGradient)"
            stroke="url(#userDashboardLogoGradient)"
            strokeWidth="3"
          />
          <line x1="50" y1="60" x2="70" y2="60" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <line x1="50" y1="75" x2="70" y2="75" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <path
            d="M 110 80 Q 90 80 90 100 Q 90 120 110 120 L 130 120 L 130 100 Q 130 80 110 80 Z"
            fill="url(#userDashboardLogoGradient)"
            stroke="url(#userDashboardLogoGradient)"
            strokeWidth="3"
          />
          <line x1="100" y1="95" x2="120" y2="95" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <line x1="100" y1="110" x2="120" y2="110" stroke="white" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <h2 className="dashboard-logo-text">Forum</h2>
      </div>
      <div className="dashboard-header">
        <h1>Welcome back, {user.name}!</h1>
        <Link to="/post/create" className="btn btn-primary">
          <FaPlus /> Create New Post
        </Link>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <FaComments className="stat-icon" />
          <div className="stat-info">
            <h3>{posts.length}</h3>
            <p>Your Posts</p>
          </div>
        </div>
        <div className="stat-card">
          <FaHeart className="stat-icon" />
          <div className="stat-info">
            <h3>{user.total_likes || 0}</h3>
            <p>Total Likes</p>
          </div>
        </div>
        <div className="stat-card">
          <FaBell className="stat-icon" />
          <div className="stat-info">
            <h3>{notifications.filter((n) => !n.is_read).length}</h3>
            <p>Unread Notifications</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-tabs">
          <button
            className={activeTab === 'posts' ? 'tab-active' : ''}
            onClick={() => setActiveTab('posts')}
          >
            My Posts
          </button>
          <button
            className={activeTab === 'notifications' ? 'tab-active' : ''}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications ({notifications.filter((n) => !n.is_read).length})
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'posts' ? (
            <div className="posts-list">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post.post_id} className="post-card">
                    <Link to={`/post/${post.post_id}`}>
                      <h3>{post.title}</h3>
                    </Link>
                    <p className="post-excerpt">{post.content?.substring(0, 150)}...</p>
                    <div className="post-stats">
                      <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                      <span>{post.comments_count || 0} comments</span>
                      <span>{post.likes || 0} likes</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>You haven't created any posts yet.</p>
                  <Link to="/post/create" className="btn btn-primary">
                    Create Your First Post
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="notifications-list">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.notification_id}
                    className={`notification-item ${!notification.is_read ? 'unread' : ''}`}
                  >
                    <p>{notification.message}</p>
                    <span className="notification-time">
                      {new Date(notification.created_at).toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <p>No notifications yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
