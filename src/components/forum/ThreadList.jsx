import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { getThreadsByCategory, getCategoryById } from '../services/forumService.jsx';
import { FaPlus, FaComments, FaHeart, FaClock, FaUser } from 'react-icons/fa';
import './ThreadList.css';

const ThreadList = () => {
  const { categoryId } = useParams();
  const { user } = useAuth();
  const [threads, setThreads] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('recent'); // 'recent' or 'popular'

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [categoryData, threadsData] = await Promise.all([
        getCategoryById(categoryId),
        getThreadsByCategory(categoryId)
      ]);
      setCategory(categoryData);
      
      // Sort threads based on selected option
      const sortedThreads = sortBy === 'popular' 
        ? [...threadsData].sort((a, b) => b.likes - a.likes)
        : threadsData;
      
      setThreads(sortedThreads);
    } catch (error) {
      console.error('Error fetching threads:', error);
    } finally {
      setLoading(false);
    }
  }, [categoryId, sortBy]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading threads...</p>
      </div>
    );
  }

  return (
    <div className="thread-list-container">
      <div className="thread-list-header">
        <div className="category-info">
          <h1>{category?.category_name || 'Category'}</h1>
          <p>{category?.description || ''}</p>
        </div>
        {user && (
          <Link to="/post/create" className="btn-create-thread">
            <FaPlus /> Create New Post
          </Link>
        )}
      </div>

      <div className="thread-controls">
        <div className="thread-stats">
          <span>{threads.length} posts</span>
        </div>
        <div className="sort-buttons">
          <button
            className={`sort-btn ${sortBy === 'recent' ? 'active' : ''}`}
            onClick={() => setSortBy('recent')}
          >
            <FaClock /> Recent
          </button>
          <button
            className={`sort-btn ${sortBy === 'popular' ? 'active' : ''}`}
            onClick={() => setSortBy('popular')}
          >
            <FaHeart /> Popular
          </button>
        </div>
      </div>

      <div className="threads-list">
        {threads.length > 0 ? (
          threads.map((thread) => (
            <Link
              to={`/post/${thread.post_id}`}
              key={thread.post_id}
              className="thread-item"
            >
              <div className="thread-content">
                <h3>{thread.title}</h3>
                <p className="thread-excerpt">
                  {thread.content?.substring(0, 150)}
                  {thread.content?.length > 150 ? '...' : ''}
                </p>
                <div className="thread-meta">
                  <span className="thread-author">
                    <FaUser /> {thread.author_name || 'Anonymous'}
                  </span>
                  <span className="thread-time">
                    <FaClock /> {formatDate(thread.created_at || thread.timestamp)}
                  </span>
                </div>
              </div>
              <div className="thread-stats">
                <div className="stat-item">
                  <FaComments />
                  <span>{thread.comment_count || thread.comments_count || 0}</span>
                </div>
                <div className="stat-item">
                  <FaHeart />
                  <span>{thread.like_count || thread.likes || 0}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-threads">
            <FaComments className="empty-icon" />
            <h3>No posts yet</h3>
            <p>Be the first to start a discussion in this category!</p>
            {user && (
              <Link to="/post/create" className="btn-create-first">
                <FaPlus /> Create First Post
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreadList;
