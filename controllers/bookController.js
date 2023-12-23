// controllers/bookController.js
const Book = require('../models/Book');

// Create a new book
const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all books with optional filter based on isAvailable
const getBooks = async (req, res) => {
  const { isAvailable } = req.query;
  const filter = isAvailable ? { isAvailable: isAvailable === 'true' } : {};

  try {
    const books = await Book.find(filter).sort({ _id: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific book by ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a book by ID
const updateBookById = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a book by ID
const deleteBookById = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Endpoint to get the number of different authors, total books, and available books
const getAuthorsAndCounts = async (req, res) => {
  try {
    const uniqueAuthorsCount = await Book.distinct('author').countDocuments();
    const totalBooksCount = await Book.countDocuments();
    const availableBooksCount = await Book.countDocuments({ isAvailable: true });

    res.status(200).json({
      uniqueAuthorsCount,
      totalBooksCount,
      availableBooksCount,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createBook,
  getBooks,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
  getAuthorsAndCounts,
};
