import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecentPosts, getPopularPosts, getCategories } from '../services/forumService.jsx';
import { FaFire, FaClock, FaComments } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recent, popular, cats] = await Promise.all([
          getRecentPosts(5),
          getPopularPosts(5),
          getCategories(),
        ]);
        setRecentPosts(recent);
        setPopularPosts(popular);
        setCategories(cats);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our Community Forum</h1>
          <p>Join discussions, share ideas, and connect with like-minded individuals</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/categories" className="btn btn-secondary">
              Explore Categories
            </Link>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-card">
          <FaComments className="stat-icon" />
          <h3>10,000+</h3>
          <p>Active Discussions</p>
        </div>
        <div className="stat-card">
          <FaFire className="stat-icon" />
          <h3>50,000+</h3>
          <p>Community Members</p>
        </div>
        <div className="stat-card">
          <FaClock className="stat-icon" />
          <h3>24/7</h3>
          <p>Community Support</p>
        </div>
      </section>

      <section className="categories-preview">
        <h2>Popular Categories</h2>
        <div className="categories-grid">
          {categories.slice(0, 6).map((category) => (
            <Link
              to={`/category/${category.category_id}/threads`}
              key={category.category_id}
              className="category-card"
            >
              <h3>{category.category_name}</h3>
              <p>{category.description}</p>
              <span className="post-count">{category.post_count || 0} posts</span>
            </Link>
          ))}
        </div>
        <Link to="/categories" className="view-all-link">
          View All Categories →
        </Link>
      </section>

      <div className="posts-container">
        <section className="recent-posts">
          <h2>
            <FaClock /> Recent Discussions
          </h2>
          {recentPosts.length > 0 ? (
            <div className="posts-list">
              {recentPosts.map((post) => (
                <Link to={`/post/${post.post_id}`} key={post.post_id} className="post-item">
                  <h4>{post.title}</h4>
                  <p className="post-meta">
                    By {post.author_name} • {new Date(post.timestamp).toLocaleDateString()}
                  </p>
                  <p className="post-excerpt">{post.content?.substring(0, 150)}...</p>
                </Link>
              ))}
            </div>
          ) : (
            <p>No recent posts available.</p>
          )}
        </section>

        <section className="popular-posts">
          <h2>
            <FaFire /> Trending Discussions
          </h2>
          {popularPosts.length > 0 ? (
            <div className="posts-list">
              {popularPosts.map((post) => (
                <Link to={`/post/${post.post_id}`} key={post.post_id} className="post-item">
                  <h4>{post.title}</h4>
                  <p className="post-meta">
                    {post.comments_count || 0} comments • {post.likes || 0} likes
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p>No trending posts available.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
