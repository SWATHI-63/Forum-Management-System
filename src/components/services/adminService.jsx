// Mock admin service for frontend-only build
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 3, name: 'Mike Admin', email: 'admin@example.com', role: 'admin', status: 'active', createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString() },
];

const mockCategories = [
  { id: 1, name: 'General', description: 'General discussions', postCount: 45, createdAt: new Date().toISOString() },
  { id: 2, name: 'Technology', description: 'Tech topics', postCount: 78, createdAt: new Date().toISOString() },
];

// Admin Stats
export const getAdminStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalUsers: 1543,
        totalPosts: 3287,
        totalCategories: 12,
        totalReports: 23,
        pendingReports: 8,
        activeUsers: 234,
        newUsersToday: 12,
        activePosts: 2890,
        recentActivity: [
          { timestamp: new Date().toISOString(), description: 'New user registered: test@example.com' },
          { timestamp: new Date(Date.now() - 3600000).toISOString(), description: 'Post reported by user #234' },
        ]
      });
    }, 300);
  });
};

// User Management
export const getUsers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockUsers), 300);
  });
};

export const updateUserStatus = async (userId, status) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, userId, status }), 300);
  });
};

export const blockUser = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, userId }), 300);
  });
};

export const unblockUser = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, userId }), 300);
  });
};

export const deleteUser = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, userId }), 300);
  });
};

export const updateUserRole = async (userId, role) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, userId, role }), 300);
  });
};

// Category Management
export const getCategories = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCategories), 300);
  });
};

export const createCategory = async (categoryData) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, id: Date.now(), ...categoryData }), 300);
  });
};

export const updateCategory = async (categoryId, categoryData) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, categoryId, ...categoryData }), 300);
  });
};

export const deleteCategory = async (categoryId) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, categoryId }), 300);
  });
};

// Post Moderation
export const getPosts = async (filter) => {
  const mockPosts = [
    { id: 1, title: 'Sample Post', author: { name: 'John' }, category: { name: 'Tech' }, status: 'visible', createdAt: new Date().toISOString() },
    { id: 2, title: 'Another Post', author: { name: 'Jane' }, category: { name: 'General' }, status: 'flagged', createdAt: new Date().toISOString() },
  ];
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPosts), 300);
  });
};

export const updatePostStatus = async (postId, status) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, postId, status }), 300);
  });
};

export const approvePost = async (postId) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, postId }), 300);
  });
};

export const deletePost = async (postId) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, postId }), 300);
  });
};

// Report Management
export const getReports = async (filter) => {
  const mockReports = [
    { id: 1, type: 'post', postId: 1, postTitle: 'Spam Post', reason: 'Spam content', reporter: { name: 'User1' }, status: 'pending', createdAt: new Date().toISOString() },
    { id: 2, type: 'comment', postId: 2, postTitle: 'Offensive Comment', reason: 'Inappropriate language', reporter: { name: 'User2' }, status: 'pending', createdAt: new Date().toISOString() },
  ];
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockReports), 300);
  });
};

export const updateReportStatus = async (reportId, status) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, reportId, status }), 300);
  });
};

export const resolveReport = async (reportId) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, reportId }), 300);
  });
};

export const dismissReport = async (reportId) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, reportId }), 300);
  });
};
