const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await sql.query`INSERT INTO Users (Username, Password) VALUES (${username}, ${hashedPassword})`;
        res.status(201).send('User registered');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

// Authenticate a user
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await sql.query`SELECT * FROM Users WHERE Username = ${username}`;
        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            const isMatch = await bcrypt.compare(password, user.Password);
            if (isMatch) {
                const token = jwt.sign({ userId: user.UserID }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.json({ message: 'Login successful', token });
            } else {
                res.status(401).send('Invalid credentials');
            }
        } else {
            res.status(401).send('User not found');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

module.exports = { registerUser, loginUser };
