// Mock user service for frontend-only build
export const getUserProfile = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user_id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        avatar: null,
        bio: 'Passionate developer and tech enthusiast',
        created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        is_current_user: false,
        total_comments: 45,
        total_likes: 123
      });
    }, 300);
  });
};

export const updateUserProfile = async (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, ...userData });
    }, 300);
  });
};

export const uploadAvatar = async (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ url: URL.createObjectURL(file) });
    }, 500);
  });
};

export const getUserPosts = async (userId) => {
  const mockUserPosts = [
    { post_id: 1, title: 'My First Post', content: 'Hello everyone!', timestamp: new Date().toISOString(), comments_count: 5, likes: 12 },
    { post_id: 2, title: 'Learning React', content: 'Sharing my React journey...', timestamp: new Date(Date.now() - 86400000).toISOString(), comments_count: 8, likes: 20 },
  ];
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockUserPosts), 300);
  });
};

export const getUserNotifications = async () => {
  const mockNotifications = [
    { notification_id: 1, message: 'Someone liked your post', is_read: false, created_at: new Date().toISOString() },
    { notification_id: 2, message: 'New reply to your comment', is_read: false, created_at: new Date(Date.now() - 3600000).toISOString() },
    { notification_id: 3, message: 'Welcome to the forum!', is_read: true, created_at: new Date(Date.now() - 86400000).toISOString() },
  ];
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockNotifications), 300);
  });
};

export const markNotificationAsRead = async (notificationId) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 300);
  });
};
