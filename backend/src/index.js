const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { initializeFirebase } = require('./config/firebase');
const connectDB = require('./config/db');

dotenv.config();

// Initialize Databases
initializeFirebase();
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// Import specific routes
const proposalRoutes = require('./routes/proposals');
const userRoutes = require('./routes/users');
const momRoutes = require('./routes/mom');
const scrutinyRoutes = require('./routes/scrutiny');
const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/users', userRoutes);
app.use('/api/mom', momRoutes);
app.use('/api/scrutiny', scrutinyRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
