const Book = require('../models/Book');
const path = require('path');

// Upload a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, description, condition, action } = req.body;
    const userId = req.user.id; // from auth middleware
    const image = req.file ? req.file.filename : null;

    const book = await Book.create({
      title,
      author,
      description,
      condition,
      action,
      image,
      userId
    });

    res.status(201).json({ message: '📚 Book uploaded!', book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '❌ Failed to upload book' });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: '❌ Failed to fetch books' });
  }
};

// Get single book
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: '❌ Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: '❌ Error getting book' });
  }
};

// Filter books by action (sell/rent/exchange)
exports.getBooksByAction = async (req, res) => {
  const { action } = req.params;
  try {
    const books = await Book.findAll({ where: { action } });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: '❌ Failed to filter books' });
  }
};

// Optional: Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: '❌ Book not found' });
    }
    await book.destroy();
    res.json({ message: '✅ Book deleted' });
  } catch (error) {
    res.status(500).json({ message: '❌ Failed to delete book' });
  }
};
