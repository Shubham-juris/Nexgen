const express = require('express');
const db = require('./db');
const router = express.Router();

// Test Route
router.get('/', (req, res) => {
  res.send('API is running...');
});

// Get Data from DB
router.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
