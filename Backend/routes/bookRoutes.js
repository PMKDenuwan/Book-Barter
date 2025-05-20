const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authenticate = require('../middleware/authenticate');
const upload = require('../middleware/upload');

// Protected: Upload a book
router.post('/', authenticate, upload.single('image'), bookController.createBook);

// Public: Get all books
router.get('/', bookController.getAllBooks);

// Public: Get one book by ID
router.get('/:id', bookController.getBookById);

// Public: Filter by action (sell/rent/exchange)
router.get('/action/:action', bookController.getBooksByAction);

// Optional: Delete book
router.delete('/:id', authenticate, bookController.deleteBook);

module.exports = router;
