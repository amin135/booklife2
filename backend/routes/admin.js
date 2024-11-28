const express = require('express');
const router = express.Router();
const { manageBooks, manageReviews } = require('../controllers/adminController');

// Admin can add, update, or delete books
router.post('/manage-books', manageBooks);

// Admin can view/manage reviews
router.get('/manage-reviews', manageReviews);

module.exports = router;
