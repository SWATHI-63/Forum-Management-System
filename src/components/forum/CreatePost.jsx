import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNotification } from '../contexts/NotificationContext.jsx';
import { getCategories, createPost } from '../services/forumService.jsx';
import { FaImage, FaVideo, FaLink, FaTimes } from 'react-icons/fa';
import './CreatePost.css';

const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category_id: '',
    content: '',
    tags: '',
  });
  const [attachments, setAttachments] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      showError('Failed to load categories');
    }
  }, [showError]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);

    // Create preview for images
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImages((prev) => [...prev, { file: file.name, url: reader.result }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
    setPreviewImages(previewImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      showError('Please enter a title');
      return;
    }

    if (!formData.category_id) {
      showError('Please select a category');
      return;
    }

    if (!formData.content.trim()) {
      showError('Please enter post content');
      return;
    }

    setLoading(true);

    try {
      const postData = {
        ...formData,
        user_id: user.user_id,
        attachments: attachments,
      };

      const result = await createPost(postData);
      showSuccess('Post created successfully!');
      navigate(`/post/${result.post_id}`);
    } catch (error) {
      showError(error.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="create-post-container">
        <div className="error-message">
          <h2>Access Denied</h2>
          <p>You must be logged in to create a post.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="create-post-container">
      <div className="create-post-card">
        <div className="create-post-header">
          <h1>Create New Post</h1>
          <p>Share your thoughts with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="form-group">
            <label htmlFor="title">Post Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter a descriptive title..."
              required
              maxLength={200}
            />
            <span className="char-count">{formData.title.length}/200</span>
          </div>

          <div className="form-group">
            <label htmlFor="category_id">Category *</label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category...</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="content">Post Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your post content here..."
              required
              rows={12}
            />
            <span className="char-count">{formData.content.length} characters</span>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (optional)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="Enter tags separated by commas (e.g., javascript, react, help)"
            />
            <small className="form-hint">Separate tags with commas</small>
          </div>

          <div className="form-group">
            <label>Attachments (optional)</label>
            <div className="attachment-section">
              <div className="upload-buttons">
                <label className="upload-btn">
                  <FaImage />
                  <span>Add Images</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    hidden
                  />
                </label>
                <label className="upload-btn">
                  <FaVideo />
                  <span>Add Videos</span>
                  <input
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={handleFileChange}
                    hidden
                  />
                </label>
                <label className="upload-btn">
                  <FaLink />
                  <span>Add Files</span>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    hidden
                  />
                </label>
              </div>

              {previewImages.length > 0 && (
                <div className="preview-grid">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="preview-item">
                      <img src={preview.url} alt={preview.file} />
                      <button
                        type="button"
                        className="remove-preview"
                        onClick={() => removeAttachment(index)}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {attachments.length > 0 && (
                <div className="attachments-list">
                  <h4>Attached Files ({attachments.length})</h4>
                  {attachments.map((file, index) => (
                    <div key={index} className="attachment-item">
                      <span>{file.name}</span>
                      <button
                        type="button"
                        className="remove-attachment"
                        onClick={() => removeAttachment(index)}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-cancel"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-submit" disabled={loading}>
              {loading ? 'Creating Post...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>

      <div className="posting-guidelines">
        <h3>Posting Guidelines</h3>
        <ul>
          <li>Use clear, descriptive titles</li>
          <li>Select the most appropriate category</li>
          <li>Be respectful and constructive</li>
          <li>Format your content for readability</li>
          <li>Add relevant tags to help others find your post</li>
          <li>Check for duplicates before posting</li>
        </ul>
      </div>
    </div>
  );
};

export default CreatePost;
