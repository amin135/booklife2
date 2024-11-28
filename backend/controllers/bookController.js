// Import the database connection pool
const db = require('../config/db');  // Assuming the path to the db connection file is correct

// Controller function to get books by filters (title, author, genre)
const getBooksByFilters = async (req, res) => {
    const { title, author, genre } = req.query; // Get filters from query parameters

    try {
        // Start with a base query. '1=1' ensures that we can append conditions easily.
        let query = "SELECT * FROM books WHERE 1=1";
        const values = [];  // Array to hold query parameters for dynamic queries

        // Add title condition if provided
        if (title) {
            query += " AND title ILIKE $" + (values.length + 1); // ILIKE for case-insensitive search
            values.push(`%${title}%`); // Push title filter into values array
        }

        // Add author condition if provided
        if (author) {
            query += " AND author ILIKE $" + (values.length + 1);
            values.push(`%${author}%`);
        }

        // Add genre condition if provided
        if (genre) {
            query += " AND genre ILIKE $" + (values.length + 1);
            values.push(`%${genre}%`);
        }

        // Execute the query with the values array
        const result = await db.query(query, values);

        // If no books match, return a 'no results' message
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No results found' });
        }

        // Return the matching books as a JSON response
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching books:', err);
        // Return an error response with status 500 for server errors
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Export the function so it can be used in the routes
module.exports = { getBooksByFilters };

