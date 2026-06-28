// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const { createBook, getAllBooks } = require('../controllers/bookController');
const { verifyToken } = require('../middlewares/authMiddleware'); // <--- 1. Import sat-set pengamannya

// 2. Pasang verifyToken sebelum createBook
router.post('/', verifyToken, createBook); // <--- Sekarang jalur ini terkunci!
router.get('/', getAllBooks); // Kalau liat buku, dibiarin bebas tanpa login

module.exports = router;