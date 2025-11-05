import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { getUserPosts, getUserNotifications } from '../services/userService.jsx';
import { FaPlus, FaBell, FaComments, FaHeart, FaTrophy, FaChartLine, FaClock, FaEye, FaThumbsUp } from 'react-icons/fa';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');

  // Calculate stats
  const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
  const totalLikes = posts.reduce((sum, post) => sum + (post.like_count || 0), 0);
  const totalComments = posts.reduce((sum, post) => sum + (post.comment_count || 0), 0);
  const mostPopularPost = posts.length > 0 ? posts.reduce((prev, current) => 
    ((current.like_count || 0) > (prev.like_count || 0)) ? current : prev
  ) : null;

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
      <div className="forum-animated-background">
        {/* Floating Particles */}
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
        <div className="particle particle-7"></div>
        <div className="particle particle-8"></div>

        {/* Animated Chat Bubbles with different sizes */}
        <div className="chat-bubble chat-bubble-1">
          <div className="bubble-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="chat-bubble chat-bubble-2">
          <div className="bubble-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="chat-bubble chat-bubble-3">
          <div className="bubble-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="chat-bubble chat-bubble-4">
          <div className="bubble-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="chat-bubble chat-bubble-5">
          <div className="bubble-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="chat-bubble chat-bubble-6">
          <div className="bubble-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Floating Icons with more variety */}
        <div className="floating-icon icon-comment">💬</div>
        <div className="floating-icon icon-heart">❤️</div>
        <div className="floating-icon icon-user">👤</div>
        <div className="floating-icon icon-message">💭</div>
        <div className="floating-icon icon-star">⭐</div>
        <div className="floating-icon icon-fire">🔥</div>
        <div className="floating-icon icon-trophy">🏆</div>
        <div className="floating-icon icon-rocket">🚀</div>
        
        {/* Animated Wave Lines */}
        <svg className="wave-background" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path className="wave-path wave-1" d="M0,160L48,165.3C96,171,192,181,288,165.3C384,149,480,107,576,101.3C672,96,768,128,864,133.3C960,139,1056,117,1152,112C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="rgba(139, 92, 246, 0.05)"></path>
          <path className="wave-path wave-2" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,154.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="rgba(236, 72, 153, 0.05)"></path>
        </svg>
        
        {/* Dynamic Connection Lines */}
        <svg className="connection-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="10" y1="20" x2="90" y2="40" className="connection-line line-1" />
          <line x1="20" y1="60" x2="80" y2="30" className="connection-line line-2" />
          <line x1="30" y1="80" x2="70" y2="20" className="connection-line line-3" />
          <line x1="50" y1="10" x2="60" y2="90" className="connection-line line-4" />
          <line x1="15" y1="45" x2="85" y2="70" className="connection-line line-5" />
        </svg>

        {/* Glowing Orbs */}
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
      </div>
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
        <h2 className="dashboard-logo-text">CHATTRIX</h2>
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
            <h3>{totalLikes}</h3>
            <p>Total Likes</p>
          </div>
        </div>
        <div className="stat-card">
          <FaEye className="stat-icon" />
          <div className="stat-info">
            <h3>{totalViews}</h3>
            <p>Total Views</p>
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

      {/* Quick Stats Section */}
      <div className="quick-stats-section">
        <div className="quick-stat-card">
          <div className="quick-stat-header">
            <FaChartLine className="quick-stat-icon" />
            <h3>Engagement Overview</h3>
          </div>
          <div className="quick-stat-grid">
            <div className="mini-stat">
              <FaThumbsUp />
              <div>
                <span className="mini-stat-value">{totalLikes}</span>
                <span className="mini-stat-label">Likes Received</span>
              </div>
            </div>
            <div className="mini-stat">
              <FaComments />
              <div>
                <span className="mini-stat-value">{totalComments}</span>
                <span className="mini-stat-label">Total Comments</span>
              </div>
            </div>
            <div className="mini-stat">
              <FaEye />
              <div>
                <span className="mini-stat-value">{totalViews}</span>
                <span className="mini-stat-label">Post Views</span>
              </div>
            </div>
            <div className="mini-stat">
              <FaClock />
              <div>
                <span className="mini-stat-value">{posts.filter(p => {
                  const postDate = new Date(p.created_at || p.timestamp);
                  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                  return postDate > weekAgo;
                }).length}</span>
                <span className="mini-stat-label">Posts This Week</span>
              </div>
            </div>
          </div>
        </div>

        {mostPopularPost && (
          <div className="quick-stat-card popular-post-card">
            <div className="quick-stat-header">
              <FaTrophy className="quick-stat-icon trophy" />
              <h3>Most Popular Post</h3>
            </div>
            <div className="popular-post-content">
              <Link to={`/post/${mostPopularPost.post_id}`}>
                <h4>{mostPopularPost.title}</h4>
              </Link>
              <div className="popular-post-stats">
                <span><FaHeart /> {mostPopularPost.like_count || 0} likes</span>
                <span><FaComments /> {mostPopularPost.comment_count || 0} comments</span>
                <span><FaEye /> {mostPopularPost.views || 0} views</span>
              </div>
            </div>
          </div>
        )}
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
