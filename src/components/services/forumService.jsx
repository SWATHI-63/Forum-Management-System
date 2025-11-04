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
  { post_id: 1, category_id: 1, title: 'Welcome to the Forum!', content: 'This is a sample post about forum guidelines and best practices...', author_name: 'Admin', timestamp: new Date().toISOString(), comments_count: 15, likes: 42 },
  { post_id: 2, category_id: 3, title: 'React Best Practices 2025', content: 'Learn about the latest React best practices and patterns...', author_name: 'John Doe', timestamp: new Date(Date.now() - 86400000).toISOString(), comments_count: 23, likes: 56 },
  { post_id: 3, category_id: 3, title: 'Getting Started with TypeScript', content: 'A comprehensive guide to TypeScript for beginners...', author_name: 'Jane Smith', timestamp: new Date(Date.now() - 172800000).toISOString(), comments_count: 18, likes: 38 },
  { post_id: 4, category_id: 4, title: 'CSS Grid vs Flexbox', content: 'Understanding when to use Grid and when to use Flexbox...', author_name: 'Mike Johnson', timestamp: new Date(Date.now() - 259200000).toISOString(), comments_count: 12, likes: 29 },
  { post_id: 5, category_id: 5, title: 'Career Tips for Developers', content: 'How to advance your career in software development...', author_name: 'Sarah Williams', timestamp: new Date(Date.now() - 345600000).toISOString(), comments_count: 31, likes: 67 },
  { post_id: 6, category_id: 2, title: 'AI Trends 2025', content: 'Latest trends in AI and machine learning...', author_name: 'Tech Guru', timestamp: new Date(Date.now() - 432000000).toISOString(), comments_count: 45, likes: 89 },
  { post_id: 7, category_id: 6, title: 'Photography Tips', content: 'Essential photography tips for beginners...', author_name: 'Photo Pro', timestamp: new Date(Date.now() - 518400000).toISOString(), comments_count: 20, likes: 34 },
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
        title: postData.title,
        content: postData.content,
        author_name: postData.author_name || 'Anonymous',
        timestamp: new Date().toISOString(),
        comments_count: 0,
        likes: 0,
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
    setTimeout(() => resolve({ success: true, message: 'Post deleted' }), 300);
  });
};

export const likePost = async (postId) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, likes: Math.floor(Math.random() * 100) }), 300);
  });
};

export const reportPost = async (postId, reason) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, message: 'Post reported' }), 300);
  });
};

// Comment services
export const getComments = async (postId) => {
  const mockComments = [
    { comment_id: 1, content: 'Great post!', author_name: 'User1', timestamp: new Date().toISOString(), parent_id: null },
    { comment_id: 2, content: 'Thanks for sharing!', author_name: 'User2', timestamp: new Date().toISOString(), parent_id: null },
  ];
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockComments), 300);
  });
};

export const addComment = async (postId, content, parentId = null) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, comment_id: Date.now(), content, parent_id: parentId }), 300);
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
