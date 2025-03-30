// Import global styles and dependencies
import './App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

// Import components
import { Header } from './components/Header'; // Top navigation bar
import { Footer } from './components/Footer'; // Bottom footer
import { Welcome } from './components/Welcome'; // Public welcome screen
import { Form } from './components/Form'; // Meeting scheduler form
import { Login } from './components/LogIn'; // Login page
import { GetStarted } from './components/GetStarted'; // Account creation form
import { Profile } from './components/Profile'; // User profile page
import { Meetings } from './components/Meetings'; // List of user's meetings
import { PrivacyPolicy } from './components/PrivacyPolicy'; // Privacy policy page
import { TermsOfService } from './components/TermsOfService'; // Terms of service page

// ProtectedRoute wrapper: Restricts access if user is not authenticated
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Get JWT token from localStorage

  if (!token) {
    // Redirect to welcome page if token is missing
    return <Navigate to="/" />;
  }

  return children; // Render protected content if authenticated
};

// Main App component
export const App = () => {
  // State to hold the current user's name (from localStorage)
  const [userName, setUserName] = useState(localStorage.getItem('username'));

  return (
    <Router>
      <div className='container'>
        {/* Header component receives current username and setter */}
        <Header userName={userName} setUserName={setUserName} />

        {/* Application Routes */}
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Welcome userName={userName} />} />
          <Route path="/login" element={<Login setUserName={setUserName} />} />
          <Route path="/get-started" element={<GetStarted setUserName={setUserName} />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* Protected routes — only accessible with valid token */}
          <Route
            path="/main"
            element={
              <ProtectedRoute>
                <Form />
              </ProtectedRoute>
            }
          />
          <Route
            path="/meetings"
            element={
              <ProtectedRoute>
                <Meetings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* Footer displayed on all pages */}
        <Footer />
      </div>
    </Router>
  );
};