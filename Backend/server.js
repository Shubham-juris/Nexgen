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

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', authRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
