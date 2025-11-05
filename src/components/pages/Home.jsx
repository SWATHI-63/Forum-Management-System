import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecentPosts, getPopularPosts, getCategories } from '../services/forumService.jsx';
import { FaFire, FaClock, FaComments, FaUsers, FaLightbulb, FaShieldAlt, FaRocket, FaHeart } from 'react-icons/fa';
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
          <h1>Welcome to CHATTRIX Community</h1>
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

      <section className="features-section">
        <h2 className="section-title">Why Join CHATTRIX?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaUsers />
            </div>
            <h3>Vibrant Community</h3>
            <p>Connect with thousands of active members sharing knowledge and experiences in real-time.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaLightbulb />
            </div>
            <h3>Expert Insights</h3>
            <p>Learn from industry experts and experienced professionals across various topics and fields.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaShieldAlt />
            </div>
            <h3>Safe & Secure</h3>
            <p>Your privacy matters. We maintain a respectful, moderated environment for meaningful discussions.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaRocket />
            </div>
            <h3>Fast & Modern</h3>
            <p>Enjoy a seamless, lightning-fast experience with our cutting-edge platform technology.</p>
          </div>
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

      <section className="how-it-works">
        <h2 className="section-title">How CHATTRIX Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Create Your Account</h3>
            <p>Sign up for free in seconds and customize your profile to reflect your interests.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Explore Topics</h3>
            <p>Browse through diverse categories and discover discussions that match your interests.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Join Conversations</h3>
            <p>Share your thoughts, ask questions, and engage with the community through comments and posts.</p>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <h3>Build Connections</h3>
            <p>Follow interesting members, earn recognition, and become part of something amazing.</p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2 className="section-title">What Our Members Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">
              CHATTRIX has become my go-to platform for learning and sharing knowledge. The community is incredibly supportive and knowledgeable!
            </p>
            <div className="testimonial-author">
              <strong>Sarah Johnson</strong>
              <span>Tech Enthusiast</span>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">
              I've found amazing mentors and collaborators here. The quality of discussions is top-notch and truly valuable.
            </p>
            <div className="testimonial-author">
              <strong>Michael Chen</strong>
              <span>Software Developer</span>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">
              Whether you're a beginner or expert, CHATTRIX welcomes everyone. I've learned so much from this incredible community!
            </p>
            <div className="testimonial-author">
              <strong>Emily Rodriguez</strong>
              <span>Content Creator</span>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <FaHeart className="cta-icon" />
          <h2>Ready to Join the Conversation?</h2>
          <p>Become part of our thriving community today and start connecting with like-minded individuals.</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary btn-large">
              Get Started Free
            </Link>
            <Link to="/categories" className="btn btn-secondary btn-large">
              Explore Topics
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
