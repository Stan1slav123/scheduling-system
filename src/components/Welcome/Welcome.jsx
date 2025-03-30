// Import SCSS styles for the Welcome page
import "./Welcome.scss";

// Welcome component for initial landing view with login and registration options
export const Welcome = () => {
  return (
    <main className="welcome">
      
      {/* Title for the welcome page */}
      <h2 className="welcome__title">Welcome to the Scheduling System!</h2>

      {/* Button group for login and get started */}
      <div className="welcome__buttons">
        <a href="/login" className="welcome__button">Log in</a>
        <a href="/get-started" className="welcome__button welcome__button--get-started">Get started</a>
      </div>
      
    </main>
  );
};