// const db = require('../db/db'); // Import the database connection

// // Login logic
// const login = (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ message: 'Username and password are required' });
//   }

//   const query = 'SELECT * FROM admins WHERE username = ? AND password = ?';
//   db.query(query, [username, password], (err, results) => {
//     if (err) {
//       console.error('Error during login:', err);
//       return res.status(500).json({ message: 'Internal server error' });
//     }

//     if (results.length === 0) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     res.json({
//       message: 'Login successful',
//       user: { id: results[0].id, username: results[0].username },
//     });
//   });
// };

// module.exports = { login };
