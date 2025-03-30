# scheduling-system
Web-based scheduling system allowing users to book, edit, and manage appointments. Developed as part of my A-level NEA
---

## 🚀 Features

- 🔐 User authentication with custom hashing algorithm
- 📅 Easy room booking with time and capacity validation
- 🔄 Real-time conflict detection to prevent double-bookings
- 📨 Confirmation email sent upon successful scheduling
- 👤 User profile and meeting history
- 🎨 Clean, responsive UI built with React
- 💾 Flat-file JSON database (no external DB required)

---

## 🛠 Technologies Used

- **Frontend**: React.js (Vite)
- **Backend**: Node.js with Express.js
- **Data Storage**: JSON files

---

## 📁 Project Structure

### Backend

- `server.js`: Main server file with all API routes
- `rooms.txt`: Raw data of all school rooms
- `rooms.json`: Parsed list of usable rooms with capacity
- `users.json`: Stores registered users (hashed passwords)
- `meetings.json`: Stores all meeting bookings

### Frontend (`src/`)

- `assets/`: Static icons and images
- `components/`:
  - `Header/`: Navigation bar
  - `Footer/`: Footer component
  - `Welcome/`: Landing page
  - `LogIn/`: Login form
  - `GetStarted/`: Registration page
  - `Form/`: Schedule a meeting form
  - `Meetings/`: Displays and deletes user meetings
  - `Profile/`: Shows user info (name, email, DOB)
  - `TermsOfService/` & `PrivacyPolicy/`: Legal pages
- `App.jsx`: Core routing and state management
- `main.jsx`: Entry point of the React app

---
