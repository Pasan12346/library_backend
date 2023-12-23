// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/books/authors-and-counts', authenticate, bookController.getAuthorsAndCounts);
router.post('/books', authenticate, bookController.createBook);
router.get('/books/get-books', bookController.getBooks);
router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.put('/books/:id', authenticate, bookController.updateBookById);
router.delete('/books/:id', authenticate, bookController.deleteBookById);

module.exports = router;
