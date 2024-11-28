// config/db.js
const { Pool } = require('pg');  // Using require for PostgreSQL module
const dotenv = require('dotenv');  // Using require for dotenv

dotenv.config();  // Load environment variables from .env file

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',  // Using environment variables for sensitive data
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'booklife',
});

pool.on('connect', () => {
    console.log('Connected to PostgreSQL Database');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client:', err);
    process.exit(-1);  // Exit the process if the database connection fails
});

// Export the pool so that it can be used in other parts of the application
module.exports = pool;