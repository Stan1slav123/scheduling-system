// Import SCSS styles for the Profile component
import { useState, useEffect } from "react";
import "./Profile.scss";

// Component that displays the current user's profile information
export const Profile = () => {
  // -------------------- STATE --------------------
  const [user, setUser] = useState(null); // Stores fetched user data
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Stores any error messages

  // -------------------- FETCH USER DATA --------------------
  useEffect(() => {
    const fetchUserProfile = async () => {
      const email = localStorage.getItem("email"); // Get user email from localStorage

      try {
        const response = await fetch(`http://localhost:5001/api/profile?email=${email}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch user data.");
        }

        setUser(data); // Save user data on success
      } catch (err) {
        setError(err.message); // Capture error message
      } finally {
        setLoading(false); // Mark loading complete
      }
    };

    fetchUserProfile(); // Fetch data on mount
  }, []);

  // -------------------- CONDITIONAL UI --------------------
  if (loading) return <p>Loading user data...</p>; // Show loading state
  if (error) return <p className="profile__error">{error}</p>; // Show error if any

  // -------------------- COMPONENT RETURN --------------------
  return (
    <main className="profile">
      <div className="profile__container">
        <h1 className="profile__title">User Profile</h1>

        {/* Profile information section */}
        <div className="profile__info">
          <p className="profile__field"><strong>Name:</strong> {user.userName}</p>
          <p className="profile__field"><strong>Email:</strong> {user.email}</p>
          <p className="profile__field"><strong>Date of Birth:</strong> {user.dob || "Not provided"}</p>
        </div>
      </div>
    </main>
  );
};