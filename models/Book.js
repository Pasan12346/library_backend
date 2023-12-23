// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: [String], default: [] },
    isAvailable: { type: Boolean, default: false },
    image: { type: String, required: true },
    description: { type: String, required: true },
  },
  { collection: 'books' },
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
