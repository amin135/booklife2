const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const { config } = require('dotenv');
const db = require('./config/db');  // Use require for the database configuration

// Import route files
const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');
const adminRoutes = require('./routes/admin');
const feedRoutes = require('./routes/feed');

// Load environment variables from .env file
config();

// Initialize the Express app
const app = express();

// Middleware to enable Cross-Origin Resource Sharing (CORS) and parse incoming JSON requests
app.use(cors());
app.use(json());

// Test Database Connection on server start
(async () => {
    try {
        const result = await db.query('SELECT NOW()');  // Query to check DB connection
        console.log('Connected to PostgreSQL Database:', result.rows[0]);
    } catch (err) {
        console.error('Failed to connect to the database:', err.message);
        process.exit(1);  // Exit the process if DB connection fails
    }
})();

// Set up routes for various API endpoints
app.use('/api/users', userRoutes);    // User-related API routes
app.use('/api/books', bookRoutes);    // Books-related API routes
app.use('/api/admin', adminRoutes);   // Admin-related API routes
app.use('/api/feed', feedRoutes);     // Feed-related API routes

// Handle any undefined routes (404 - Not Found)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start the Express server on the specified port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});