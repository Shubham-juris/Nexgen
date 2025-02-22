app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' });
  }

  try {
    const query = 'SELECT * FROM admins WHERE username = ? AND password = ?';
    const [results] = await promisePool.query(query, [username, password]);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      user: { id: results[0].id, username: results[0].username },
    });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Admin Registration API (No password hashing)
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' });
  }

  try {
    const checkQuery = 'SELECT * FROM admins WHERE username = ?';
    const [checkResults] = await promisePool.query(checkQuery, [username]);

    if (checkResults.length > 0) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const insertQuery = 'INSERT INTO admins (username, password) VALUES (?, ?)';
    const [insertResults] = await promisePool.query(insertQuery, [
      username,
      password,
    ]);

    res.status(201).json({
      message: 'Admin registered successfully',
      user: { id: insertResults.insertId, username },
    });
  } catch (err) {
    console.error('Error during registration:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});
