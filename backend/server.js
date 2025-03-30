// Import required modules
const express = require('express'); // Backend web framework
const cors = require('cors'); // Allows requests from the frontend (React)
const bodyParser = require('body-parser'); // Parses incoming JSON data
const fs = require('fs'); // File system module to read/write JSON files
const nodemailer = require('nodemailer'); // Used to send confirmation emails
const app = express();
const port = 5001;
// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'contact.sktech247@gmail.com',
    pass: 'rerk uuox lrjy zdwl',
  },
});

// Function to send confirmation email
const sendConfirmationEmail = (email, meetingDetails) => {
  const mailOptions = {
    from: 'contact.sktech247@gmail.com',
    to: email,
    subject: 'Meeting Confirmation',
    text: `
      Hello, Your meeting has been scheduled successfully with the following details:

      Date: ${meetingDetails.date}
      Room: ${meetingDetails.room}
      Number of participants: ${meetingDetails.numberOfParticipants}
      Start Time: ${meetingDetails.startTime}
      End Time: ${meetingDetails.endTime}

      Thank you for using our scheduling system!

      Best regards,
      SK Team
    `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Generate a random key for password salting
const generateKey = (length = 8) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  for (let i = 0; i < length; i++) {
    key += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return key;
};

// Custom hashing function (Simple Hashing Algorithm)
const customHash = (password, key) => {
  let hash = 0;

  for (let i = 0; i < password.length; i++) {
    const charCode = password.charCodeAt(i);
    hash = (hash * 31 + charCode) % 1000000007;
  }

  let saltedHash = '';
  for (let i = 0; i < key.length; i++) {
    saltedHash += String.fromCharCode((hash % 26) + 65);
    hash = (hash * 17 + key.charCodeAt(i)) % 1000000007;
  }

  return saltedHash;
};

// Enable CORS and parse JSON
app.use(cors());
app.use(bodyParser.json());

let users = require('./users.json');
let meetings = require('./meetings.json');

// Helper to save data to JSON files
const saveToJsonFile = (fileName, array) => {
  fs.writeFileSync(fileName, JSON.stringify(array, null, 2));
};

// Generate admin credentials and push if not exists
const adminPassword = "admin";
const adminKey = generateKey();
const adminHashedPassword = customHash(adminPassword, adminKey);
const admin = { userName: "Admin", email: "admin", password: adminHashedPassword, key: adminKey, dob: "-" };
const ifAdminNotExists = !users.find(user => user.email === "admin");
if (ifAdminNotExists) {
  users.push(admin);
}
saveToJsonFile('users.json', users);

// Convert rooms.txt to rooms.json
const convertRoomsTxtToJson = () => {
  const data = fs.readFileSync('rooms.txt', 'utf8');
  const roomsArray = data.split(',');
  const rooms = [];
  roomsArray.forEach(room => {
    let [roomName, capacity] = room.split('(');
    capacity = Number(capacity.replace(/\D/g, ''));
    if ( capacity > 0 && !roomName.trim().match(/not in use/i)) {
      rooms.push({ roomName: roomName.trim(), capacity });
    }
  });
  saveToJsonFile('rooms.json', rooms);
};
convertRoomsTxtToJson();
let rooms = require('./rooms.json');

// Format time after adding duration
const timeFormatting = (duration, time) => {
  let hours = Number(time.slice(0, 2));
  let minutes = Number(time.slice(3, 5));

  if (duration.match(/.5/)) {
    duration = Number(duration);
    minutes += 30;
    duration -= 0.5;
    if (minutes >= 60) {
      minutes -= 60;
      hours += 1;
    }
  }

  hours += Number(duration);
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
};

// Convert time into minutes
const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

// ------------------ API ROUTES ------------------ //

// Register a new user
app.post('/api/register', (req, res) => {
  const { userName, email, password, dob } = req.body;

  // Validate request body
  if (!userName || !email || !password || !dob) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check for existing user
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Generate salt key and hashed password
  const key = generateKey();
  const hashedPassword = customHash(password, key);

  // Add user to list and save
  const newUser = { userName, email, password: hashedPassword, key, dob };
  users.push(newUser);
  saveToJsonFile('users.json', users);

  // Send response
  res.status(201).json({ userName: newUser.userName, email: newUser.email, token: "success", rooms, message: 'User registered successfully' });
});

// Log in an existing user
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Find user by email
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Hash the attempt and compare
  const hashedAttempt = customHash(password, user.key);
  if (hashedAttempt !== user.password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Send response
  res.status(200).json({ userName: user.userName, email: user.email, token: "success", rooms, message: 'Login successful' });
});

const { v4: uuidv4 } = require('uuid');

// Schedule a new meeting
app.post('/api/meeting-form', (req, res) => {
  const { userName, email, date, time, duration, selectedRoom, neededCapacity } = req.body;

  // Validate request body
  if (!userName || !date || !time || !duration || !selectedRoom || !neededCapacity) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newStartTime = timeToMinutes(time);
  const newEndTime = timeToMinutes(timeFormatting(duration, time));

  // Conflict check
  for (let meeting of meetings) {
    if (meeting.room === selectedRoom && meeting.date === date) {
      const existingStartTime = timeToMinutes(meeting.startTime);
      const existingEndTime = timeToMinutes(meeting.endTime);
      const isOverlapping = !(newEndTime <= existingStartTime || newStartTime >= existingEndTime);
      if (isOverlapping) {
        return res.status(400).json({ message: `There is an existing meeting between ${meeting.startTime} and ${meeting.endTime}` });
      }
    }
  }

  // If no conflict, create meeting
  const newMeeting = {
    id: uuidv4(),
    userName,
    email,
    date,
    startTime: time,
    endTime: timeFormatting(duration, time),
    duration,
    room: selectedRoom,
    numberOfParticipants: neededCapacity
  };
  meetings.push(newMeeting);
  saveToJsonFile('meetings.json', meetings);

  // Send confirmation email (not to admin)
  const userEmail = users.find(user => user.userName === userName).email;
  if (userEmail !== 'admin') {
    if (userEmail) {
      sendConfirmationEmail(userEmail, newMeeting);
    } else {
      console.error("Email is not defined");
    }
  }

  // Send response
  res.status(201).json({ token: "success", message: 'New meeting added successfully' });
});

// Get user profile by email
app.get('/api/profile', (req, res) => {
  const { email } = req.query;
  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Send response
  res.status(200).json(user);
});

// Get meetings for a specific user
app.get('/api/meetings', (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const userMeetings = meetings.filter(meeting => meeting.email === email);

  // Send response
  res.status(200).json(userMeetings);
});

// Delete a specific meeting
app.delete('/api/meetings/:id', (req, res) => {
  const { id } = req.params;
  const index = meetings.findIndex(meeting => meeting.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Meeting not found" });
  }

  meetings.splice(index, 1);
  saveToJsonFile('meetings.json', meetings);

  // Send response
  res.status(200).json({ message: "Meeting deleted successfully" });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
