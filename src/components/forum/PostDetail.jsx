import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getPostById, addComment, likePost, unlikePost, deletePost } from '../../services/forumService';
import { FaHeart, FaRegHeart, FaComment, FaShare, FaEdit, FaTrash, FaArrowLeft, FaClock, FaUser } from 'react-icons/fa';
import './PostDetail.css';

const PostDetail = () => {
  const { postId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const data = await getPostById(parseInt(postId));
      setPost(data);
      setComments(data.comments || []);
      
      // Check if current user has liked this post
      if (user && data.likes) {
        setIsLiked(data.likes.includes(user.user_id));
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching post:', error);
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to comment');
      return;
    }

    if (!newComment.trim()) {
      return;
    }

    try {
      const comment = {
        comment_id: Date.now(),
        post_id: post.post_id,
        user_id: user.user_id,
        user_name: user.name,
        content: newComment,
        created_at: new Date().toISOString(),
      };

      await addComment(post.post_id, comment);
      setComments([...comments, comment]);
      setNewComment('');
      
      // Update post comment count
      setPost({ ...post, comment_count: (post.comment_count || 0) + 1 });
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment');
    }
  };

  const handleLike = async () => {
    if (!user) {
      alert('Please login to like posts');
      return;
    }

    try {
      if (isLiked) {
        await unlikePost(post.post_id, user.user_id);
        setPost({ ...post, like_count: (post.like_count || 0) - 1 });
        setIsLiked(false);
      } else {
        await likePost(post.post_id, user.user_id);
        setPost({ ...post, like_count: (post.like_count || 0) + 1 });
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this post: ${post.title}`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        setShowShareMenu(false);
        return;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(post.post_id);
        navigate('/categories');
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="error-container">
        <h2>Post not found</h2>
        <Link to="/categories" className="btn btn-primary">
          <FaArrowLeft /> Back to Categories
        </Link>
      </div>
    );
  }

  return (
    <div className="post-detail-container">
      <div className="post-detail-header">
        <Link to="/categories" className="back-button">
          <FaArrowLeft /> Back to Topics
        </Link>
      </div>

      <div className="post-detail-card">
        <div className="post-header">
          <div className="post-author-info">
            <div className="author-avatar">
              <FaUser />
            </div>
            <div>
              <h4>{post.author_name || 'Anonymous'}</h4>
              <p className="post-meta">
                <FaClock /> {formatDate(post.created_at)}
              </p>
            </div>
          </div>
          
          {user && post.user_id === user.user_id && (
            <div className="post-actions">
              <button className="btn-icon" onClick={() => navigate(`/post/edit/${post.post_id}`)}>
                <FaEdit /> Edit
              </button>
              <button className="btn-icon btn-danger" onClick={handleDelete}>
                <FaTrash /> Delete
              </button>
            </div>
          )}
        </div>

        <div className="post-content">
          <h1>{post.title}</h1>
          
          {post.category_name && (
            <span className="post-category">{post.category_name}</span>
          )}

          <div className="post-body">
            <p>{post.content}</p>
          </div>

          {post.attachments && post.attachments.length > 0 && (
            <div className="post-attachments">
              <h3>Attachments</h3>
              <div className="attachments-grid">
                {post.attachments.map((file, index) => (
                  <div key={index} className="attachment-item">
                    {file.type && file.type.startsWith('image/') ? (
                      <img src={file.url} alt={file.name} />
                    ) : (
                      <div className="file-icon">
                        <span>📄</span>
                        <p>{file.name}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="post-stats">
          <div className="stat-item">
            <button 
              className={`like-button ${isLiked ? 'liked' : ''}`} 
              onClick={handleLike}
            >
              {isLiked ? <FaHeart /> : <FaRegHeart />}
              <span>{post.like_count || 0} {(post.like_count || 0) === 1 ? 'Like' : 'Likes'}</span>
            </button>
          </div>

          <div className="stat-item">
            <FaComment />
            <span>{comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}</span>
          </div>

          <div className="stat-item share-item">
            <button 
              className="share-button" 
              onClick={() => setShowShareMenu(!showShareMenu)}
            >
              <FaShare />
              <span>Share</span>
            </button>
            
            {showShareMenu && (
              <div className="share-menu">
                <button onClick={() => handleShare('twitter')}>Twitter</button>
                <button onClick={() => handleShare('facebook')}>Facebook</button>
                <button onClick={() => handleShare('linkedin')}>LinkedIn</button>
                <button onClick={() => handleShare('copy')}>Copy Link</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="comments-section">
        <h2>Comments ({comments.length})</h2>

        {user ? (
          <form onSubmit={handleAddComment} className="comment-form">
            <div className="comment-input-wrapper">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                rows="3"
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={!newComment.trim()}>
              Post Comment
            </button>
          </form>
        ) : (
          <div className="login-prompt">
            <p>Please <Link to="/login">login</Link> to comment on this post.</p>
          </div>
        )}

        <div className="comments-list">
          {comments.length === 0 ? (
            <p className="no-comments">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.comment_id} className="comment-item">
                <div className="comment-avatar">
                  <FaUser />
                </div>
                <div className="comment-content">
                  <div className="comment-header">
                    <h4>{comment.user_name || 'Anonymous'}</h4>
                    <span className="comment-time">{formatDate(comment.created_at)}</span>
                  </div>
                  <p>{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
