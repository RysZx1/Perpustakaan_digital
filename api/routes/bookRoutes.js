// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const { createBook, getAllBooks, updateBook, deleteBook } = require('../controllers/bookController');
const { verifyToken } = require('../middlewares/authMiddleware'); // <--- 1. Import sat-set pengamannya

// 2. Pasang verifyToken sebelum createBook, updateBook, deleteBook
router.post('/', verifyToken, createBook); // <--- Sekarang jalur ini terkunci!
router.get('/', getAllBooks); // Kalau liat buku, dibiarin bebas tanpa login
router.put('/:id', verifyToken, updateBook);
router.delete('/:id', verifyToken, deleteBook);

module.exports = router;