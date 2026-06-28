const express = require('express');
const router = express.Router();
const {
    pinjamBuku,
    kembalikanBuku,
    getAllBorrows,
    getBorrowHistory,
    deleteBorrow
} = require('../controllers/borrowController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, pinjamBuku);
router.get('/', verifyToken, getBorrowHistory);
router.get('/all', verifyToken, getAllBorrows);
router.put('/:id/kembalikan', verifyToken, kembalikanBuku);
router.delete('/:id', verifyToken, deleteBorrow);

module.exports = router;
