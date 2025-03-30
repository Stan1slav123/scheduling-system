// Import styles for the Meetings component
import { useEffect, useState } from 'react';
import './Meetings.scss';

// Main Meetings component responsible for displaying and deleting meetings
export const Meetings = () => {
  // -------------------- STATE --------------------
  const [meetings, setMeetings] = useState([]); // Holds all meetings for the current user
  const email = localStorage.getItem('email'); // Retrieve email from localStorage

  // -------------------- LOAD MEETINGS ON PAGE LOAD --------------------
  useEffect(() => {
    if (email) {
      // Fetch user meetings from the backend using email
      fetch(`http://localhost:5001/api/meetings?email=${email}`)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
            setMeetings(data); // Store meetings if the response is an array
          } else {
            setMeetings([]); // Fallback if something goes wrong
          }
        })
        .catch(error => console.error('Error loading meetings:', error));
    }
  }, [email]);

  // -------------------- DELETE MEETING --------------------
  const handleDelete = async (meetingId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/meetings/${meetingId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted meeting from the list
        setMeetings(meetings.filter(meeting => meeting.id !== meetingId));
      } else {
        alert('Error deleting meeting');
      }
    } catch (error) {
      console.error('Error deleting meeting:', error);
    }
  };

  // -------------------- COMPONENT RETURN --------------------
  return (
    <main className="meetings">
      {/* Page container */}
      <div className="meetings__container">
        {/* Grid of meeting cards */}
        <div className="meetings__grid">
          {meetings.length > 0 ? (
            // Render one card per meeting
            meetings.map((meeting) => (
              <div key={meeting.id} className="meetings__card">
                <h2 className="meetings__room">{meeting.room}</h2>
                <p className="meetings__detail"><strong>Date:</strong> {meeting.date}</p>
                <p className="meetings__detail"><strong>Start Time:</strong> {meeting.startTime}</p>
                <p className="meetings__detail"><strong>End Time:</strong> {meeting.endTime}</p>
                <p className="meetings__detail"><strong>Participants:</strong> {meeting.numberOfParticipants}</p>
                
                {/* Delete button */}
                <div className="meetings__buttons">
                  <button
                    className="meetings__button" 
                    onClick={() => handleDelete(meeting.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            // Message shown if no meetings exist
            <p className="meetings__empty">No meetings scheduled.</p>
          )}
        </div>
      </div>
    </main>
  );
};