# Forum Management System

A comprehensive, feature-rich Forum Management System built with React.js that enables users to create, view, and participate in online discussions across various topics. The platform provides an organized and user-friendly interface for managing posts, comments, and categories, enabling seamless communication within a community.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Features

### 👤 User Module
- **Authentication System**
  - User registration with email validation
  - Secure login with password hashing
  - JWT-based authentication
  - Protected routes

- **Profile Management**
  - Edit name, bio, and avatar
  - View personal statistics
  - Track post history and engagement

- **Post Interaction**
  - Create posts with text, images, and links
  - Commenting and reply system
  - Like/Upvote functionality
  - Report inappropriate content
  - Edit and delete own posts

- **Search & Discovery**
  - Search posts by keywords, author, or topic
  - Filter by category
  - Sort by date, popularity, or activity

- **Notifications**
  - Real-time notifications for replies
  - User mentions alerts
  - Activity tracking

### 🧑‍💼 Admin Module
- **Dashboard**
  - Overview statistics
  - Active users monitoring
  - Recent activity log
  - Quick action shortcuts

- **User Management**
  - View all registered users
  - Block/Unblock users
  - Delete user accounts
  - Role management (Admin, Moderator, User)

- **Content Moderation**
  - Approve or delete posts
  - Remove inappropriate comments
  - Monitor reported content
  - Batch moderation tools

- **Category Management**
  - Create new categories
  - Edit category details
  - Delete categories
  - Organize discussions

- **Report Management**
  - View all user reports
  - Take action on reports
  - Track resolution status

### 💬 Forum/Discussion Module
- **Category Organization**
  - Browse discussions by category
  - View category descriptions
  - See post counts per category

- **Thread Management**
  - Category-wise thread creation
  - Recent and popular discussions
  - Thread sorting (date, popularity, activity)
  - Pagination for large discussions

- **Engagement Features**
  - Upvote/like posts
  - Nested comment threads
  - Reply to comments
  - Share discussions

## 🛠️ Tech Stack

### Frontend
- **React.js 18.2.0** - UI Library
- **React Router DOM 6.20.0** - Navigation
- **React Icons** - Icon Library
- **date-fns** - Date Formatting
- **classnames** - Conditional CSS Classes

### Backend (Firebase)
- **Firebase Authentication** - User authentication
- **Cloud Firestore** - NoSQL database
- **Cloud Storage** - File storage for images
- **Firebase Hosting** - Web hosting

### Development Tools
- **Create React App** - Build Tool
- **ESLint** - Code Linting
- **Firebase CLI** - Deployment

## 📁 Project Structure

```
Forum-Management-System/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── UserManagement.jsx
│   │   │   ├── CategoryManagement.jsx
│   │   │   ├── PostModeration.jsx
│   │   │   └── ReportManagement.jsx
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── common/
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   ├── forum/
│   │   │   ├── Categories.jsx
│   │   │   ├── ThreadList.jsx
│   │   │   ├── PostDetail.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   └── SearchResults.jsx
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   └── user/
│   │       ├── UserProfile.jsx
│   │       ├── EditProfile.jsx
│   │       └── UserDashboard.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   └── NotificationContext.jsx
│   ├── services/
│   │   ├── api.jsx
│   │   ├── authService.jsx
│   │   ├── userService.jsx
│   │   ├── forumService.jsx
│   │   └── adminService.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account (free tier available)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/SWATHI-63/Forum-Management-System.git
cd Forum-Management-System
```

2. **Install dependencies**
```bash
npm install
npm install firebase
```

3. **Set up Firebase**
   
   Follow the detailed guide in `FIREBASE_SETUP.md` to:
   - Create a Firebase project
   - Enable Authentication (Email/Password)
   - Set up Firestore Database
   - Set up Cloud Storage
   - Get your Firebase configuration

4. **Configure Firebase**

Create `src/firebase/config.js` with your Firebase credentials:
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

5. **Start the development server**
```bash
npm start
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Deploy to Firebase

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase Hosting
firebase init hosting

# Deploy
firebase deploy
```

## 🔐 Security Features

- **Firebase Authentication** - Secure user authentication
- **Firestore Security Rules** - Database access control
- **Storage Security Rules** - File upload protection
- **Role-Based Access Control** - Admin, Moderator, User roles
- **Protected Routes** - Secure navigation
- **Input Validation** - Client-side validation

## 📊 Firebase Collections Structure

### Users Collection
```javascript
users/{userId} {
  name: string
  email: string
  role: 'user' | 'moderator' | 'admin'
  status: 'active' | 'blocked'
  avatar: string
  bio: string
  created_at: timestamp
}
```

### Categories Collection
```javascript
categories/{categoryId} {
  category_name: string
  description: string
  post_count: number
  created_at: timestamp
}
```

### Posts Collection
```javascript
posts/{postId} {
  user_id: string
  category_id: string
  title: string
  content: string
  image_url: string
  link_url: string
  likes: number
  status: 'pending' | 'approved' | 'flagged'
  timestamp: timestamp
}
```

### Comments Collection
```javascript
comments/{commentId} {
  post_id: string
  user_id: string
  parent_id: string | null
  content: string
  timestamp: timestamp
}
```

### Reports Collection
```javascript
reports/{reportId} {
  post_id: string | null
  comment_id: string | null
  reporter_id: string
  reason: string
  status: 'pending' | 'resolved' | 'dismissed'
  created_at: timestamp
}
```

### Notifications Collection
```javascript
notifications/{notificationId} {
  user_id: string
  message: string
  is_read: boolean
  created_at: timestamp
}
```

## 🔌 Firebase Services Used

### Authentication
- Email/Password authentication
- User session management
- Password reset functionality

### Firestore Database
- Real-time data synchronization
- Offline data persistence
- Scalable NoSQL database

### Cloud Storage
- Image and file uploads
- Avatar storage
- Post images storage

### Hosting (Optional)
- Fast and secure web hosting
- SSL certificate included
- Global CDN

## 📝 Usage Examples

### Creating a Post
1. Login to your account
2. Click "Create Post" in navigation
3. Select category
4. Add title and content
5. Optionally add images or links
6. Submit post

### Admin Moderation
1. Login as admin
2. Navigate to Admin Panel
3. Choose moderation section
4. Review flagged content
5. Approve or delete posts

## 🎨 Customization

### Theming
Update CSS variables in `src/App.css`:
```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #64748b;
  --success-color: #10b981;
  --danger-color: #ef4444;
  /* ... more colors */
}
```

### Configuration
Modify Firebase settings in `src/firebase/config.js`.

## 🐛 Known Issues

- Firebase integration in progress (services need migration)
- Real-time notifications require Cloud Functions (optional)

## 🔮 Future Enhancements

- [ ] Real-time messaging with Firebase
- [ ] Email notifications with SendGrid
- [ ] Social media login (Google, GitHub)
- [ ] Advanced search with Algolia
- [ ] Mobile app with React Native
- [ ] Dark mode
- [ ] Multi-language support (i18n)
- [ ] Rich text editor (Markdown/WYSIWYG)
- [ ] File attachments
- [ ] User reputation system
- [ ] Badges and achievements
- [ ] Push notifications

---

## 📚 Documentation

- **[Firebase Setup Guide](FIREBASE_SETUP.md)** - Complete Firebase setup instructions
- **[Frontend Status](FRONTEND_COMPLETE.md)** - Frontend completion checklist
- **[README](README.md)** - This file

---

**Note**: This project uses Firebase as the backend. Follow `FIREBASE_SETUP.md` for complete setup instructions. The frontend is 100% complete and ready for Firebase integration.