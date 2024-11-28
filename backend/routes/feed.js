const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Feed!',
        featuredBooks: [
            
                {title: 'Book 1', author: 'Author 1'},
                {title: 'Book 2', author: 'Author 2'},
                {title: 'Book 3', author: 'Author 3'},       
        ],
    });
});

module.exports = router;