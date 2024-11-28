const express = require('express');
const router = express.Router();
const db = require('../config/db');  // Import database connection

// Controller to get books based on filters
const getBooksByFilters = async (req, res) => {
    const { title, author, genre } = req.query;  // Get filters from query parameters

    console.log('Query received by backend:', req.query);

    try {
        let query = 'SELECT * FROM books WHERE true';  // Base query
        let params = [];  // Array to hold dynamic query parameters

        // Dynamically add conditions to the query based on received parameters
        if (title) {
            query += ' AND title ILIKE $' + (params.length + 1);  // Add condition for title
            params.push(`%${title}%`);  // Add title filter to the params
        }
        if (author) {
            query += ' AND author ILIKE $' + (params.length + 1);  // Add condition for author
            params.push(`%${author}%`);  // Add author filter to the params
        }
        if (genre) {
            query += ' AND genre ILIKE $' + (params.length + 1);  // Add condition for genre
            params.push(`%${genre}%`);  // Add genre filter to the params
        }

        // Log the generated query and parameters for debugging purposes
        console.log('Generated query:', query);
        console.log('With params:', params);

        // Execute the query
        const result = await db.query(query, params);
        console.log('Query result:', result.rows);

        // If no results found, return 404 with a message
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No matching results found.' });
        }

        // Return the found books as JSON
        res.json(result.rows);

    } catch (err) {
        // Log any errors that occur during query execution
        console.error('No matching results found.', err);

        // Return an error response with a 500 status code
        res.status(500).json({ message: 'Error fetching books' });
    }
};

// Define the GET route for fetching books
router.get('/', getBooksByFilters);

module.exports = router;  // Export the router to be used in app.js
