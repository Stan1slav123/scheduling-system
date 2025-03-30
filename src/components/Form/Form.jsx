// Importing the SCSS file
import './Form.scss';

// Import necessary React hooks and router
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Main form component responsible for booking meetings
export const Form = () => {
  // -------------------- STATE VARIABLES --------------------
  const [rooms, setRooms] = useState([]); // Holds the list of available rooms
  const [selectedRoom, setSelectedRoom] = useState(''); // Stores the room user selected
  const [userName, setUserName] = useState(''); // Stores the user's name
  const [email, setEmail] = useState(''); // Stores the user's email
  const [date, setDate] = useState(''); // Selected meeting date
  const [time, setTime] = useState(''); // Selected meeting time
  const [neededCapacity, setCapacity] = useState('0'); // Number of participants
  const [duration, setDuration] = useState('0.5'); // Meeting duration in hours

  const navigate = useNavigate(); // Used for navigating between pages

  // -------------------- VALIDATION FUNCTIONS --------------------

  // Get today’s date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Prevents selecting past dates
  const validateDate = (selectedDate) => {
    const today = getCurrentDate();
    return selectedDate >= today;
  };

  // Restricts booking to valid hours only (school day)
  const validateTime = (selectedTime) => {
    const minTime = "08:45";
    const maxTime = "15:25";
    return selectedTime >= minTime && selectedTime <= maxTime;
  };

  // -------------------- EFFECT ON PAGE LOAD --------------------

  // Load saved user and room data from localStorage when the component mounts
  useEffect(() => {
    const storedUserName = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const roomsString = localStorage.getItem('rooms');

    if (storedUserName) setUserName(storedUserName);
    if (storedEmail) setEmail(storedEmail);
    if (roomsString) setRooms(JSON.parse(roomsString));
  }, []);

  // -------------------- FORM SUBMISSION HANDLER --------------------

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Client-side validation before sending to backend
    if (!validateDate(date)) {
      alert("You cannot book a past date!");
      return;
    }

    if (!validateTime(time)) {
      alert("Please select a time between 08:45 and 15:25!");
      return;
    }

    if (neededCapacity <= 0) {
      alert("Please select a number of participants!");
      return;
    }

    // Construct the meeting object
    const meetingData = {
      userName,
      email,
      date,
      time,
      duration,
      selectedRoom: selectedRoom.split(',')[0], // Extract room name only
      neededCapacity
    };

    try {
      // Send meeting data to backend
      const response = await fetch('http://localhost:5001/api/meeting-form ', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meetingData)
      });

      const data = await response.json();

      // Handle response from backend
      if (response.ok) {
        alert('Meeting scheduled successfully, redirecting to you meetings!');
      } else {
        alert(data.message || 'Error scheduling meeting.');
      }

      // Redirect after a delay
      setTimeout(() => {
        setUserName(data.userName); // Update local username
        navigate('/meetings'); // Redirect to My Meetings page
      }, 500);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to schedule the meeting. Please try again.');
    }
  };

  // -------------------- COMPONENT RETURN --------------------

  return (
    <main className="scheduling-form">
      <div className="scheduling-form__container">
        <h1 className="scheduling-form__title">Schedule a Meeting</h1>

        <form className="scheduling-form__form" id="scheduleForm" onSubmit={handleSubmit} noValidate>

          {/* Username input field */}
          <label className="scheduling-form__label" htmlFor="name">Your Name:</label>
          <input
            className="scheduling-form__input"
            type="text"
            id="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          {/* Date selection */}
          <label className="scheduling-form__label" htmlFor="date">Date:</label>
          <input
            className="scheduling-form__input"
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          {/* Time selection */}
          <label className="scheduling-form__label" htmlFor="time">Time:</label>
          <input
            className="scheduling-form__input"
            step="900"
            type="time"
            min="08:45"
            max="15:25"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          {/* Duration dropdown */}
          <label className="scheduling-form__label" htmlFor="duration">Duration:</label>
          <select
            className="scheduling-form__select"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="0.5">30 minutes</option>
            <option value="1">1 hour</option>
            <option value="1.5">1.5 hours</option>
            <option value="2">2 hours</option>
            <option value="2.5">2.5 hours</option>
            <option value="3">3 hours</option>
          </select>

          {/* Number of participants */}
          <label className="scheduling-form__label" htmlFor="capacity">Number of participants:</label>
          <input
            className="scheduling-form__input"
            type="text"
            id="capacity"
            value={neededCapacity}
            onChange={(e) => setCapacity(e.target.value)}
          />

          {/* Room selection dropdown */}
          <label className="scheduling-form__label" htmlFor="room">Room:</label>
          <select
            className="scheduling-form__select"
            id="room"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
          >
            <option value="">Select Room</option>
            {
              rooms.filter(room => room.capacity >= neededCapacity).map((room, index) => (
                <option key={`${room.roomName}-${index}`} value={room.name}>
                  {room.roomName}, Capacity: {room.capacity}
                </option>
              ))
            }
          </select>

          {/* Submit button */}
          <button className="scheduling-form__button" type="submit">Schedule Meeting</button>
        </form>
      </div>
    </main>
  );
};