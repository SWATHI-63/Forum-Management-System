import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/forumService.jsx';
import { FaFolder, FaComments, FaPlus } from 'react-icons/fa';
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="categories-container">
      <div className="categories-header">
        <div className="header-content">
          <h1>
            <FaFolder /> CHATTRIX Categories
          </h1>
          <p>Browse and explore all discussion categories</p>
        </div>
        <Link to="/post/create" className="btn-create-post">
          <FaPlus /> Create New Post
        </Link>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="categories-grid">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <Link
              to={`/category/${category.category_id}/threads`}
              key={category.category_id}
              className="category-card"
            >
              <div className="category-icon">
                <FaComments />
              </div>
              <div className="category-info">
                <h3>{category.category_name}</h3>
                <p>{category.description}</p>
                <div className="category-stats">
                  <span className="post-count">
                    {category.post_count || 0} posts
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-results">
            <p>No categories found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
