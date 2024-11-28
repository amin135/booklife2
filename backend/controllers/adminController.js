const db = require('../config/db');  // Import db using require in CommonJS style

// Add or update a book
const manageBooks = async (req, res) => {
    const { title, author, genre, description, coverImage } = req.body;
    try {
        // Use db.query directly for SQL queries
        await db.query('INSERT INTO Books (Title, Author, Genre, Description, CoverImage) VALUES ($1, $2, $3, $4, $5)', [title, author, genre, description, coverImage]);
        res.status(201).send('Book added successfully');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

// View all reviews
const manageReviews = async (req, res) => {
    try {
        // Use db.query directly for SQL queries
        const result = await db.query('SELECT * FROM Reviews');
        res.json(result.rows); // Use `rows` for the results from pg (PostgreSQL)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

module.exports = { manageBooks, manageReviews };
