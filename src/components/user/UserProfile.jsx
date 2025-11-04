import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserProfile, getUserPosts } from '../services/userService.jsx';
import { FaEnvelope, FaCalendar, FaEdit, FaComments, FaHeart, FaFire, FaTrophy, FaMedal, FaStar, FaAward, FaCrown, FaChartLine, FaEye, FaThumbsUp } from 'react-icons/fa';
import './UserProfile.css';

const UserProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');

  // Calculate user statistics and gamification data
  const calculateStats = () => {
    if (!profile || !posts) return null;

    const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0);
    const totalComments = posts.reduce((sum, post) => sum + (post.comments_count || 0), 0);
    const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
    const avgLikesPerPost = posts.length > 0 ? (totalLikes / posts.length).toFixed(1) : 0;
    
    // Calculate level and points
    const points = totalLikes * 10 + totalComments * 5 + posts.length * 20;
    const level = Math.floor(points / 500) + 1;
    const currentLevelPoints = points % 500;
    const nextLevelPoints = 500;
    const progress = (currentLevelPoints / nextLevelPoints) * 100;

    // Determine rank based on points
    let rank = 'Newcomer';
    if (points >= 5000) rank = 'Legend';
    else if (points >= 3000) rank = 'Master';
    else if (points >= 2000) rank = 'Expert';
    else if (points >= 1000) rank = 'Advanced';
    else if (points >= 500) rank = 'Intermediate';
    else if (points >= 100) rank = 'Beginner';

    // Calculate streak (mock data - in real app would track daily activity)
    const streak = Math.floor(Math.random() * 30) + 1;

    return {
      totalLikes,
      totalComments,
      totalViews,
      avgLikesPerPost,
      points,
      level,
      currentLevelPoints,
      nextLevelPoints,
      progress,
      rank,
      streak
    };
  };

  // Badge system
  const getBadges = () => {
    if (!posts) return [];

    const badges = [];
    const stats = calculateStats();
    
    if (posts.length >= 1) badges.push({ id: 1, name: 'First Post', icon: '📝', description: 'Created your first post', color: '#10b981' });
    if (posts.length >= 10) badges.push({ id: 2, name: 'Contributor', icon: '✍️', description: 'Published 10 posts', color: '#3b82f6' });
    if (posts.length >= 50) badges.push({ id: 3, name: 'Author', icon: '📚', description: 'Published 50 posts', color: '#8b5cf6' });
    if (posts.length >= 100) badges.push({ id: 4, name: 'Prolific Writer', icon: '🏆', description: 'Published 100 posts', color: '#f59e0b' });
    
    if (stats.totalLikes >= 50) badges.push({ id: 5, name: 'Popular', icon: '⭐', description: 'Received 50 likes', color: '#ec4899' });
    if (stats.totalLikes >= 200) badges.push({ id: 6, name: 'Influencer', icon: '🌟', description: 'Received 200 likes', color: '#f59e0b' });
    if (stats.totalLikes >= 500) badges.push({ id: 7, name: 'Celebrity', icon: '👑', description: 'Received 500 likes', color: '#fbbf24' });
    
    if (stats.totalComments >= 50) badges.push({ id: 8, name: 'Conversationalist', icon: '💬', description: 'Received 50 comments', color: '#06b6d4' });
    if (stats.totalComments >= 200) badges.push({ id: 9, name: 'Discussion Starter', icon: '🗣️', description: 'Received 200 comments', color: '#8b5cf6' });
    
    if (stats.streak >= 7) badges.push({ id: 10, name: 'Dedicated', icon: '🔥', description: '7-day activity streak', color: '#ef4444' });
    if (stats.streak >= 30) badges.push({ id: 11, name: 'Unstoppable', icon: '⚡', description: '30-day activity streak', color: '#f59e0b' });
    
    if (stats.level >= 5) badges.push({ id: 12, name: 'Rising Star', icon: '🚀', description: 'Reached Level 5', color: '#3b82f6' });
    if (stats.level >= 10) badges.push({ id: 13, name: 'Community Legend', icon: '👑', description: 'Reached Level 10', color: '#fbbf24' });

    return badges;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, postsData] = await Promise.all([
          getUserProfile(userId),
          getUserPosts(userId),
        ]);
        setProfile(profileData);
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="error-container">
        <h2>User not found</h2>
        <Link to="/">Go back home</Link>
      </div>
    );
  }

  const stats = calculateStats();
  const badges = getBadges();

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {profile.avatar ? (
            <img src={profile.avatar} alt={profile.name} />
          ) : (
            <div className="avatar-placeholder">{profile.name?.charAt(0).toUpperCase()}</div>
          )}
          <div className="avatar-level">
            <FaStar /> Lv {stats?.level || 1}
          </div>
        </div>
        <div className="profile-info">
          <div className="profile-name-rank">
            <h1>{profile.name}</h1>
            <span className="user-rank" style={{ background: `linear-gradient(135deg, ${stats?.rank === 'Legend' ? '#fbbf24, #f59e0b' : stats?.rank === 'Master' ? '#8b5cf6, #6366f1' : '#3b82f6, #06b6d4'})` }}>
              <FaCrown /> {stats?.rank || 'Newcomer'}
            </span>
          </div>
          {profile.bio && <p className="profile-bio">{profile.bio}</p>}
          <div className="profile-meta">
            <span>
              <FaEnvelope /> {profile.email}
            </span>
            <span>
              <FaCalendar /> Joined {new Date(profile.created_at).toLocaleDateString()}
            </span>
            <span>
              <FaComments /> {posts.length} Posts
            </span>
            <span className="streak-badge">
              <FaFire /> {stats?.streak || 0} day streak
            </span>
          </div>
          {profile.is_current_user && (
            <Link to="/profile/edit" className="btn btn-primary">
              <FaEdit /> Edit Profile
            </Link>
          )}
        </div>
      </div>

      {/* Gamification Module - Level Progress */}
      <div className="gamification-section">
        <div className="level-progress-card">
          <div className="level-header">
            <div className="level-info">
              <FaTrophy className="trophy-icon" />
              <div>
                <h3>Level {stats?.level || 1}</h3>
                <p>{stats?.points || 0} Total Points</p>
              </div>
            </div>
            <div className="next-level">
              <span>Next Level</span>
              <strong>{stats?.currentLevelPoints || 0} / {stats?.nextLevelPoints || 500} XP</strong>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${stats?.progress || 0}%` }}></div>
          </div>
        </div>

        {/* Statistics Dashboard */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #ec4899, #f43f5e)' }}>
              <FaHeart />
            </div>
            <div className="stat-content">
              <h4>{stats?.totalLikes || 0}</h4>
              <p>Total Likes</p>
              <span className="stat-detail">Avg {stats?.avgLikesPerPost || 0} per post</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}>
              <FaComments />
            </div>
            <div className="stat-content">
              <h4>{stats?.totalComments || 0}</h4>
              <p>Total Comments</p>
              <span className="stat-detail">Engagement level</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}>
              <FaEye />
            </div>
            <div className="stat-content">
              <h4>{stats?.totalViews || 0}</h4>
              <p>Total Views</p>
              <span className="stat-detail">Post visibility</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }}>
              <FaChartLine />
            </div>
            <div className="stat-content">
              <h4>{posts.length}</h4>
              <p>Total Posts</p>
              <span className="stat-detail">Content created</span>
            </div>
          </div>
        </div>

        {/* Badges & Achievements */}
        <div className="badges-section">
          <h3><FaMedal /> Badges & Achievements ({badges.length})</h3>
          <div className="badges-grid">
            {badges.length > 0 ? (
              badges.map((badge) => (
                <div key={badge.id} className="badge-card" style={{ borderColor: badge.color }}>
                  <div className="badge-icon" style={{ background: badge.color }}>
                    {badge.icon}
                  </div>
                  <div className="badge-info">
                    <h4>{badge.name}</h4>
                    <p>{badge.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-badges">Start contributing to earn badges!</p>
            )}
          </div>
        </div>

        {/* Activity Stats */}
        <div className="activity-stats">
          <h3><FaChartLine /> Activity Overview</h3>
          <div className="activity-grid">
            <div className="activity-item">
              <FaThumbsUp className="activity-icon" />
              <div>
                <h4>Engagement Rate</h4>
                <p>{posts.length > 0 ? ((stats?.totalComments / posts.length) * 100).toFixed(1) : 0}%</p>
              </div>
            </div>
            <div className="activity-item">
              <FaFire className="activity-icon" />
              <div>
                <h4>Current Streak</h4>
                <p>{stats?.streak || 0} days</p>
              </div>
            </div>
            <div className="activity-item">
              <FaAward className="activity-icon" />
              <div>
                <h4>Badges Earned</h4>
                <p>{badges.length} achievements</p>
              </div>
            </div>
            <div className="activity-item">
              <FaTrophy className="activity-icon" />
              <div>
                <h4>Rank Progress</h4>
                <p>{stats?.rank || 'Newcomer'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-tabs">
          <button
            className={activeTab === 'posts' ? 'tab-active' : ''}
            onClick={() => setActiveTab('posts')}
          >
            Posts ({posts.length})
          </button>
          <button
            className={activeTab === 'about' ? 'tab-active' : ''}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'posts' ? (
            <div className="user-posts">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post.post_id} className="post-card">
                    <Link to={`/post/${post.post_id}`}>
                      <h3>{post.title}</h3>
                    </Link>
                    <p className="post-excerpt">{post.content?.substring(0, 200)}...</p>
                    <div className="post-footer">
                      <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                      <span>{post.comments_count || 0} comments</span>
                      <span>{post.likes || 0} likes</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No posts yet.</p>
              )}
            </div>
          ) : (
            <div className="user-about">
              <h3>About {profile.name}</h3>
              {profile.bio ? (
                <p>{profile.bio}</p>
              ) : (
                <p>No bio available.</p>
              )}
              <div className="user-stats">
                <div className="stat">
                  <h4>{posts.length}</h4>
                  <p>Total Posts</p>
                </div>
                <div className="stat">
                  <h4>{profile.total_comments || 0}</h4>
                  <p>Total Comments</p>
                </div>
                <div className="stat">
                  <h4>{profile.total_likes || 0}</h4>
                  <p>Total Likes</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
