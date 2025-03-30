// Import the SCSS styles for the header component
import "./Header.scss";
import { useNavigate } from 'react-router-dom';

// Header component displaying navigation and logout logic
export const Header = ({ userName, setUserName }) => {
  const navigate = useNavigate(); // Used to programmatically navigate to different routes

  // Function to handle user logout
  const handleLogout = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    localStorage.removeItem('token'); // Remove stored token
    localStorage.removeItem('username'); // Remove stored username
    setUserName(null); // Clear userName from state
    navigate('/'); // Redirect to home page
  };

  return (
    <header className="header">
      <div className="header__container">
        
        {/* Logo section with link */}
        <div className="header__logo-wrap">
          <h1 className="header__logo">
            <a className="header__logo-link" href={userName ? "/main" : "/"}>Scheduling System</a>
          </h1>

          {/* Navigation for logged-in users */}
          <nav className="navbar">
            <a className="navbar__link navbar__link--decorated" href="/profile">Profile</a>
            <a className="navbar__link navbar__link--decorated" href="/meetings">My meetings</a>
            <a className="navbar__link navbar__link--decorated" href="/main">Schedule a meeting</a>
          </nav>
        </div>

        {/* Right-side navbar: Shows login or user info depending on state */}
        <div className="navbar">
          {userName ? (
            <>
              <span className="navbar__user">Welcome, {userName}</span>
              <a className="navbar__logout" href="/" onClick={handleLogout}>Logout</a>
            </>
          ) : (
            <>
              <a className="navbar__link" href="/login">Log in</a>
              <a className="navbar__get-started" href="/get-started">Get started</a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};