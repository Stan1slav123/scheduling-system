// Import styles for the Login component
import "./Login.scss";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Main login component responsible for user authentication
export const Login = ({ setUserName }) => {
  // -------------------- STATE VARIABLES --------------------
  const [email, setEmail] = useState(''); // Stores the email input
  const [password, setPassword] = useState(''); // Stores the password input
  const [errorMessage, setErrorMessage] = useState(''); // Error message if login fails
  const [successMessage, setSuccessMessage] = useState(''); // Success message on login
  const [loading, setLoading] = useState(false); // Loading spinner/indicator

  const navigate = useNavigate(); // React Router navigation hook

  // -------------------- VALIDATION FUNCTIONS --------------------

  // Validate password is at least 8 characters long
  const validatePassword = (password) => {
    return password.length >= 8;
  };

  // Validate email structure
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // -------------------- FORM SUBMISSION HANDLER --------------------

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent page refresh
    setLoading(true); // Start loading

    // Validate email format unless it's admin
    if (!validateEmail(email) && email !== 'admin') {
      setErrorMessage('Invalid email format.');
      setLoading(false);
      return;
    }

    // Validate password length unless it's admin
    if (!validatePassword(password) && password !== 'admin') {
      setErrorMessage('Password must be at least 8 characters long.');
      setLoading(false);
      return;
    }

    const loginData = { email, password };

    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Save user data and token to localStorage
        localStorage.setItem('email', data.email);
        localStorage.setItem('username', data.userName);
        localStorage.setItem('token', data.token);
        localStorage.setItem('rooms', JSON.stringify(data.rooms));

        setSuccessMessage('Login successful!');
        setErrorMessage('');
        setUserName(data.userName);
        setEmail(data.email);

        // Redirect after short delay
        setTimeout(() => {
          setLoading(false);
          navigate('/main');
        }, 1000);
      } else {
        setErrorMessage(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An unexpected error occurred');
      setLoading(false);
    }
  };

  // -------------------- COMPONENT RETURN --------------------

  return (
    <main className="login">
      <div className="login__container">
        <h1 className="login__title">Log in</h1>
        <form className="login__form" onSubmit={handleLogin} noValidate>

          {/* Email field */}
          <label className="login__label" htmlFor="email">Email:</label>
          <input
            className="login__input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password field */}
          <label className="login__label" htmlFor="password">Password:</label>
          <input
            className="login__input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Submit button */}
          <button className="login__button" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Submit'}
          </button>

          {/* Messages */}
          {errorMessage && <p className="login__error">{errorMessage}</p>}
          {successMessage && <p className="login__success">{successMessage}</p>}

          <br />
          <a className="login__link" href="/get-started">or Get started</a>
        </form>
      </div>
    </main>
  );
};