// Mock data for frontend-only build
const mockCategories = [
  { category_id: 1, category_name: 'General Discussion', description: 'General topics and conversations', post_count: 150 },
  { category_id: 2, category_name: 'Technology', description: 'Tech news and discussions', post_count: 200 },
  { category_id: 3, category_name: 'Programming', description: 'Coding and development topics', post_count: 180 },
  { category_id: 4, category_name: 'Design', description: 'UI/UX and graphic design', post_count: 90 },
  { category_id: 5, category_name: 'Career', description: 'Job search and career advice', post_count: 120 },
  { category_id: 6, category_name: 'Hobbies', description: 'Share your hobbies and interests', post_count: 75 },
];

// Store posts in localStorage organized by category
let mockPosts = JSON.parse(localStorage.getItem('forumPosts')) || [
  { 
    post_id: 1, 
    category_id: 1, 
    category_name: 'General Discussion',
    title: 'Welcome to CHATTRIX!', 
    content: 'This is a sample post about CHATTRIX community guidelines and best practices...', 
    author_name: 'Admin', 
    user_id: 1,
    created_at: new Date().toISOString(), 
    comment_count: 0, 
    like_count: 0,
    likes: [],
    comments: []
  },
  { 
    post_id: 2, 
    category_id: 3, 
    category_name: 'Programming',
    title: 'React Best Practices 2025', 
    content: 'Learn about the latest React best practices and patterns...', 
    author_name: 'John Doe', 
    user_id: 2,
    created_at: new Date(Date.now() - 86400000).toISOString(), 
    comment_count: 0, 
    like_count: 0,
    likes: [],
    comments: []
  },
  { 
    post_id: 3, 
    category_id: 3, 
    category_name: 'Programming',
    title: 'Getting Started with TypeScript', 
    content: 'A comprehensive guide to TypeScript for beginners...', 
    author_name: 'Jane Smith', 
    user_id: 3,
    created_at: new Date(Date.now() - 172800000).toISOString(), 
    comment_count: 0, 
    like_count: 0,
    likes: [],
    comments: []
  },
];

// Helper function to save posts to localStorage
const savePosts = () => {
  localStorage.setItem('forumPosts', JSON.stringify(mockPosts));
};

// Category services
export const getCategories = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Update post counts dynamically
      const categoriesWithCounts = mockCategories.map(category => ({
        ...category,
        post_count: mockPosts.filter(post => post.category_id === category.category_id).length
      }));
      resolve(categoriesWithCounts);
    }, 300);
  });
};

export const getCategoryById = async (categoryId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const category = mockCategories.find(cat => cat.category_id === parseInt(categoryId));
      resolve(category || mockCategories[0]);
    }, 300);
  });
};

// Post services
export const getRecentPosts = async (limit = 10) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPosts.slice(0, limit)), 300);
  });
};

export const getPopularPosts = async (limit = 10) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockPosts].sort((a, b) => b.likes - a.likes).slice(0, limit)), 300);
  });
};

export const getThreadsByCategory = async (categoryId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const categoryPosts = mockPosts.filter(post => post.category_id === parseInt(categoryId));
      resolve(categoryPosts);
    }, 300);
  });
};

export const getPostById = async (postId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = mockPosts.find(p => p.post_id === parseInt(postId));
      resolve(post || mockPosts[0]);
    }, 300);
  });
};

export const createPost = async (postData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPost = {
        post_id: mockPosts.length > 0 ? Math.max(...mockPosts.map(p => p.post_id)) + 1 : 1,
        category_id: parseInt(postData.category_id),
        category_name: postData.category_name || '',
        title: postData.title,
        content: postData.content,
        author_name: postData.author_name || 'Anonymous',
        user_id: postData.user_id || 1,
        created_at: new Date().toISOString(),
        comment_count: 0,
        like_count: 0,
        likes: [],
        comments: [],
        attachments: postData.attachments || [],
        tags: postData.tags || ''
      };
      mockPosts.unshift(newPost); // Add to beginning of array
      savePosts(); // Save to localStorage
      resolve(newPost);
    }, 300);
  });
};

export const updatePost = async (postId, postData) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, ...postData }), 300);
  });
};

export const deletePost = async (postId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockPosts = mockPosts.filter(p => p.post_id !== parseInt(postId));
      savePosts();
      resolve({ success: true, message: 'Post deleted' });
    }, 300);
  });
};

export const likePost = async (postId, userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = mockPosts.find(p => p.post_id === parseInt(postId));
      if (post) {
        if (!post.likes) post.likes = [];
        if (!post.likes.includes(userId)) {
          post.likes.push(userId);
          post.like_count = (post.like_count || 0) + 1;
          savePosts();
        }
      }
      resolve({ success: true, likes: post.like_count });
    }, 300);
  });
};

export const unlikePost = async (postId, userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = mockPosts.find(p => p.post_id === parseInt(postId));
      if (post) {
        if (!post.likes) post.likes = [];
        post.likes = post.likes.filter(id => id !== userId);
        post.like_count = Math.max((post.like_count || 0) - 1, 0);
        savePosts();
      }
      resolve({ success: true, likes: post.like_count });
    }, 300);
  });
};

export const reportPost = async (postId, reason) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, message: 'Post reported' }), 300);
  });
};

// Comment services
export const getComments = async (postId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = mockPosts.find(p => p.post_id === parseInt(postId));
      resolve(post ? (post.comments || []) : []);
    }, 300);
  });
};

export const addComment = async (postId, commentData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = mockPosts.find(p => p.post_id === parseInt(postId));
      if (post) {
        if (!post.comments) post.comments = [];
        
        // If it's a reply (has parent_id), add it to the parent comment's replies
        if (commentData.parent_id) {
          const parentComment = post.comments.find(c => c.comment_id === commentData.parent_id);
          if (parentComment) {
            if (!parentComment.replies) parentComment.replies = [];
            parentComment.replies.push(commentData);
          }
        } else {
          // It's a top-level comment
          if (!commentData.replies) commentData.replies = [];
          post.comments.push(commentData);
        }
        
        post.comment_count = (post.comment_count || 0) + 1;
        savePosts();
      }
      resolve({ success: true, comment: commentData });
    }, 300);
  });
};

export const updateComment = async (commentId, content) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, content }), 300);
  });
};

export const deleteComment = async (commentId) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, message: 'Comment deleted' }), 300);
  });
};

// Search services
export const searchPosts = async (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = mockPosts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 300);
  });
};
