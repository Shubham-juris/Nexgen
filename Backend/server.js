// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');
// const authRoutes = require('./routes/authRoutes'); // Assuming you have routes defined in this file

// const app = express();
// const PORT = process.env.PORT || 8080;

// // CORS middleware
// app.use(
//   cors({
//     origin: 'https://www.nexgeneducare.com/', // Replace with your live frontend URL
//     methods: ['GET', 'POST'], // Define allowed methods
//     allowedHeaders: ['Content-Type'], // Define allowed headers
//   })
// );

// // Middleware to parse incoming JSON requests
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Set up routes
// app.use('/api', authRoutes); // API routes for authentication or other purposes

// // Example API route
// app.get('/api/data', (req, res) => {
//   res.json({ message: 'Hello from API' });
// });

// // MySQL database connection
// const db = mysql.createConnection({
//   host: process.env.DB_HOST || 'nexgeneducare.com',
//   user: process.env.DB_USER || 'nexgen',
//   password: process.env.DB_PASSWORD || 'Nexgen$2025',
//   database: process.env.DB_NAME || 'admin_nexgen',
// });

// // Connect to the database
// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed:', err.stack);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });

// // Start the server on port 8080
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// Import necessary modules
// Import necessary modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

// Initialize the app
const app = express();

// Set allowed origins for CORS (local and live)
const allowedOrigins = [
  'http://localhost:4000', // Local development URL
  'https://nexgeneducare.com', // Live production URL
];

// Use CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the origin is in the allowed list or if no origin is provided (for server-to-server requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(
          new Error('CORS policy does not allow access from this origin.')
        );
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'], // Allow these methods
    allowedHeaders: ['Content-Type'], // Allow Content-Type header
  })
);

// Middleware for parsing JSON
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// MySQL connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Admin login route
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  // Query to check if the user exists in the "admins" table
  const query = 'SELECT * FROM admins WHERE username = ?';
  db.query(query, [username], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error querying database' });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const admin = result[0];

    // Plain-text password comparison (no bcrypt)
    if (password === admin.password) {
      return res.status(200).json({ message: 'Login successful', admin });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// Start server
app.listen(8080, () => {
  console.log('Backend running on port 8080');
});
