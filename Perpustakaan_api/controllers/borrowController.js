const Borrow = require('../models/borrowModels');
const Book = require('../models/bookModels');
const User = require('../models/userModels');

const pinjamBuku = async (req, res) => {
    try {
        const { BookId } = req.body;
        const UserId = req.user.id;

        const book = await Book.findByPk(BookId);
        if (!book) {
            return res.status(404).json({ message: "Buku tidak ditemukan!" });
        }

        if (book.stok < 1) {
            return res.status(400).json({ message: "Stok buku ini sudah habis!" });
        }

        const existing = await Borrow.findOne({
            where: { UserId, BookId, status: 'dipinjam' }
        });
        if (existing) {
            return res.status(400).json({ message: "Anda masih meminjam buku ini, kembalikan dulu!" });
        }

        const newBorrow = await Borrow.create({ UserId, BookId, status: 'dipinjam' });

        book.stok = book.stok - 1;
        await book.save();

        const data = await Borrow.findByPk(newBorrow.id, {
            include: [
                { model: Book, attributes: ['judul', 'penulis', 'penerbit'] },
                { model: User, attributes: ['nama', 'email'] }
            ]
        });

        res.status(201).json({ message: "Buku berhasil dipinjam!", data });
    } catch (error) {
        res.status(500).json({ message: "Error server!", error: error.message });
    }
};

const kembalikanBuku = async (req, res) => {
    try {
        const { id } = req.params;
        const UserId = req.user.id;

        const borrow = await Borrow.findOne({
            where: { id, UserId, status: 'dipinjam' },
            include: [{ model: Book }]
        });

        if (!borrow) {
            return res.status(404).json({ message: "Data peminjaman tidak ditemukan!" });
        }

        borrow.status = 'dikembalikan';
        borrow.tanggal_kembali = new Date();
        await borrow.save();

        const book = await Book.findByPk(borrow.BookId);
        if (book) {
            book.stok = book.stok + 1;
            await book.save();
        }

        res.status(200).json({ message: "Buku berhasil dikembalikan!", data: borrow });
    } catch (error) {
        res.status(500).json({ message: "Error server!", error: error.message });
    }
};

const getAllBorrows = async (req, res) => {
    try {
        const borrows = await Borrow.findAll({
            include: [
                { model: Book, attributes: ['judul', 'penulis', 'penerbit'] },
                { model: User, attributes: ['nama', 'email'] }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json({ message: "Data semua peminjaman", data: borrows });
    } catch (error) {
        res.status(500).json({ message: "Error server!", error: error.message });
    }
};

const getBorrowHistory = async (req, res) => {
    try {
        const UserId = req.user.id;
        const borrows = await Borrow.findAll({
            where: { UserId },
            include: [
                { model: Book, attributes: ['judul', 'penulis', 'penerbit'] },
                { model: User, attributes: ['nama', 'email'] }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json({ message: "Riwayat pinjaman berhasil diambil", data: borrows });
    } catch (error) {
        res.status(500).json({ message: "Error server!", error: error.message });
    }
};

const deleteBorrow = async (req, res) => {
    try {
        const { id } = req.params;

        const borrow = await Borrow.findByPk(id);
        if (!borrow) {
            return res.status(404).json({ message: "Data peminjaman tidak ditemukan!" });
        }

        if (borrow.status === 'dipinjam') {
            const book = await Book.findByPk(borrow.BookId);
            if (book) {
                book.stok = book.stok + 1;
                await book.save();
            }
        }

        await borrow.destroy();
        res.status(200).json({ message: "Data peminjaman berhasil dihapus!" });
    } catch (error) {
        res.status(500).json({ message: "Error server!", error: error.message });
    }
};

module.exports = { pinjamBuku, kembalikanBuku, getAllBorrows, getBorrowHistory, deleteBorrow };
