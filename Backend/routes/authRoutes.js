const express = require('express');
const db = require('../db');
const router = express.Router();

// Admin Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' });
  }

  db.query(
    'SELECT * FROM admins WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (results.length > 0) {
        return res.json({ message: 'Login successful', user: results[0] });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    }
  );
});

module.exports = router;
