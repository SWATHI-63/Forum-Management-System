import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { FaBars, FaTimes, FaUser, FaSearch, FaMoon, FaSun } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-container">
            <svg className="logo-icon" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
              {/* Left chat bubble - Beige */}
              <rect x="50" y="60" width="90" height="60" rx="15" fill="#F5DEB3" stroke="#333" strokeWidth="3"/>
              <circle cx="70" cy="85" r="5" fill="#333"/>
              <circle cx="90" cy="85" r="5" fill="#333"/>
              <circle cx="110" cy="85" r="5" fill="#333"/>
              <path d="M 90 120 L 80 140 L 100 120 Z" fill="#F5DEB3" stroke="#333" strokeWidth="3"/>
              
              {/* Middle chat bubble - Green */}
              <rect x="155" y="40" width="90" height="60" rx="15" fill="#90EE90" stroke="#333" strokeWidth="3"/>
              <circle cx="175" cy="65" r="5" fill="#333"/>
              <circle cx="195" cy="65" r="5" fill="#333"/>
              <circle cx="215" cy="65" r="5" fill="#333"/>
              <path d="M 200 100 L 190 120 L 210 100 Z" fill="#90EE90" stroke="#333" strokeWidth="3"/>
              
              {/* Right chat bubble - Orange */}
              <rect x="260" y="60" width="90" height="60" rx="15" fill="#FFA500" stroke="#333" strokeWidth="3"/>
              <circle cx="280" cy="85" r="5" fill="#333"/>
              <circle cx="300" cy="85" r="5" fill="#333"/>
              <circle cx="320" cy="85" r="5" fill="#333"/>
              <path d="M 305 120 L 295 140 L 315 120 Z" fill="#FFA500" stroke="#333" strokeWidth="3"/>
              
              {/* Left person - Orange */}
              <ellipse cx="100" cy="170" rx="25" ry="30" fill="#FFA500" stroke="#333" strokeWidth="3"/>
              <circle cx="100" cy="155" r="20" fill="#FFEFD5" stroke="#333" strokeWidth="3"/>
              
              {/* Middle person - Pink */}
              <ellipse cx="200" cy="170" rx="25" ry="30" fill="#FF69B4" stroke="#333" strokeWidth="3"/>
              <circle cx="200" cy="155" r="20" fill="#FFEFD5" stroke="#333" strokeWidth="3"/>
              
              {/* Right person - Light Blue */}
              <ellipse cx="300" cy="170" rx="25" ry="30" fill="#87CEEB" stroke="#333" strokeWidth="3"/>
              <circle cx="300" cy="155" r="20" fill="#FFEFD5" stroke="#333" strokeWidth="3"/>
            </svg>
            <span className="logo-text">CHATTRIX</span>
          </div>
        </Link>

        <div className="navbar-search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
        </div>

        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={mobileMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={toggleMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/categories" className="nav-link" onClick={toggleMobileMenu}>
              Categories
            </Link>
          </li>

          {user ? (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link" onClick={toggleMobileMenu}>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/post/create" className="nav-link" onClick={toggleMobileMenu}>
                  Create Post
                </Link>
              </li>
              {isAdmin() && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link admin-link" onClick={toggleMobileMenu}>
                    Admin Panel
                  </Link>
                </li>
              )}
              <li className="nav-item dropdown">
                <span className="nav-link">
                  <FaUser /> {user.name}
                </span>
                <div className="dropdown-content">
                  <Link to={`/user/${user.user_id}`} onClick={toggleMobileMenu}>
                    My Profile
                  </Link>
                  <Link to="/profile/edit" onClick={toggleMobileMenu}>
                    Edit Profile
                  </Link>
                  <Link to="#" onClick={() => { logout(); toggleMobileMenu(); }}>
                    Logout
                  </Link>
                </div>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={toggleMobileMenu}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link btn-register" onClick={toggleMobileMenu}>
                  Register
                </Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
