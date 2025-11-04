// Mock auth service for frontend-only build
export const loginUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        resolve({
          token: 'mock-jwt-token-' + Date.now(),
          user: {
            user_id: 1,
            name: 'Demo User',
            email: email,
            role: email.includes('admin') ? 'admin' : 'user',
            avatar: null,
            bio: 'Demo user for frontend testing'
          }
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
};

export const registerUser = async (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          user_id: Date.now(),
          name: userData.name,
          email: userData.email,
          role: 'user',
          avatar: null,
          bio: ''
        }
      });
    }, 500);
  });
};

export const getCurrentUser = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const token = localStorage.getItem('token');
      if (token) {
        resolve({
          user_id: 1,
          name: 'Demo User',
          email: 'demo@example.com',
          role: 'user',
          avatar: null,
          bio: 'Demo user for frontend testing'
        });
      } else {
        reject(new Error('Not authenticated'));
      }
    }, 300);
  });
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};
