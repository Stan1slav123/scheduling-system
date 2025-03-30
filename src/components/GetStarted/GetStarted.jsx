// Importing the SCSS file
import "./GetStarted.scss";

// Import necessary React hooks and router
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// GetStarted component handles user registration
export const GetStarted = ({ setUserName }) => {
  // -------------------- STATE VARIABLES --------------------
  const [userName, setName] = useState(''); // Stores entered username
  const [email, setEmail] = useState(''); // Stores entered email
  const [password, setPassword] = useState(''); // Stores entered password
  const [dob, setDob] = useState(''); // Stores entered date of birth
  const [message, setMessage] = useState(''); // Message for feedback/errors
  const [loading, setLoading] = useState(false); // Loading state during registration

  const navigate = useNavigate(); // Hook to programmatically navigate to other pages

  // -------------------- VALIDATION FUNCTIONS --------------------

  // Validate username length and allowed characters
  const validateUserName = (userName) => {
    if (userName.length >= 30) return false;
    const userNameRegex = /^[a-zA-Z0-9_-]+$/;
    return userNameRegex.test(userName);
  };

  // Validate standard email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Ensure password contains at least one number
  const validatePasswordNumbers = (password) => {
    const numberRegex = /\d/;
    return numberRegex.test(password);
  };

  // Ensure password contains at least one special character
  const validatePasswordSpecialChar = (password) => {
    const specialCharRegex = /[!@#$%&|<>]/;
    return specialCharRegex.test(password);
  };

  // -------------------- FORM SUBMISSION HANDLER --------------------

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Username validation
    if (!validateUserName(userName)) {
      setMessage('Invalid name format.');
      setLoading(false);
      return;
    }

    // Email format check
    if (!validateEmail(email)) {
      setMessage('Invalid email format.');
      setLoading(false);
      return;
    }

    // Password strength checks
    if (!validatePasswordNumbers(password)) {
      setMessage('Password must contain at least one number 0-9');
      setLoading(false);
      return;
    }
    if (!validatePasswordSpecialChar(password)) {
      setMessage('Password must contain at least one special character !@#$%&|<>');
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      setMessage('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    // Prepare the user object to send to backend
    const userData = { userName, email, password, dob };

    try {
      const response = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store credentials in localStorage
        localStorage.setItem('username', data.userName);
        localStorage.setItem('email', data.email);
        localStorage.setItem('token', data.token);
        localStorage.setItem('rooms', JSON.stringify(data.rooms));

        setMessage('User registered successfully!');

        // Simulate short delay before navigating to main page
        setTimeout(() => {
          setLoading(false);
          navigate('/main');
          setUserName(data.userName);
        }, 1000);
      } else {
        setMessage(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  // -------------------- COMPONENT RETURN --------------------

  return (
    <main className="get-started">
      <div className="get-started__container">
        <h1 className="get-started__title">Get Started</h1>

        <form className="get-started__form" onSubmit={handleRegister} noValidate>

          {/* Username field */}
          <label className="get-started__label" htmlFor="userName">User name:</label>
          <input
            className="get-started__input"
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Date of Birth field */}
          <label className="get-started__label" htmlFor="dob">Date of Birth:</label>
          <input
            className="get-started__input"
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          {/* Email input */}
          <label className="get-started__label" htmlFor="email">Email:</label>
          <input
            className="get-started__input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password input */}
          <label className="get-started__label" htmlFor="password">Password:</label>
          <input
            className="get-started__input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Submit Button */}
          <button className="get-started__button" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>

          {/* Message output for error/success */}
          {message && <p className="get-started__message">{message}</p>}

        </form>
      </div>
    </main>
  );
};
