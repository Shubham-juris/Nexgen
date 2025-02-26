// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const db = require('./db');
// const routes = require('./routes');

// const app = express();
// app.use(express.json());
// app.use(cors());

// app.use('/api', routes);

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const db = require('./db/db');
// const authRoutes = require('./routes/auth');

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Routes
// app.use('/api', authRoutes);

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on http://nexgeneducare.com:${PORT}`);
// });

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/db');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS Configuration
const corsOptions = {
  origin: ['http://localhost:4000', 'https://nexgeneducare.com'], // Allowed origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  // credentials: true, // Allow cookies if needed
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// ✅ Handle Preflight Requests
app.options('*', cors(corsOptions));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use('/api', authRoutes);

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ✅ Global Error Handling
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
