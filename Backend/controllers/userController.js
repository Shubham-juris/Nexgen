const db = require('../db');
const bcrypt = require('bcrypt'); // For password hashing and comparison

// User Login
exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' });
  }

  db.query(
    'SELECT * FROM admins WHERE username = ?',
    [username],
    (err, results) => {
      if (err) {
        console.error('Error fetching admin:', err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (results.length === 0) {
        return res
          .status(401)
          .json({ message: 'Invalid username or password' });
      }

      const user = results[0];

      // Compare entered password with stored hashed password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).json({ message: 'Authentication error' });
        }

        if (!isMatch) {
          return res
            .status(401)
            .json({ message: 'Invalid username or password' });
        }

        // Login success
        res.json({
          message: 'Login successful',
          user: { id: user.id, username: user.username },
        });
      });
    }
  );
};

// Create New User (for registration)
exports.createUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' });
  }

  // Hash the password before saving
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ message: 'Error processing request' });
    }

    db.query(
      'INSERT INTO admins (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      (err, result) => {
        if (err) {
          console.error('Error inserting user:', err);
          return res.status(500).json({ message: 'Database error' });
        }
        res.json({ message: 'User created successfully', id: result.insertId });
      }
    );
  });
};
