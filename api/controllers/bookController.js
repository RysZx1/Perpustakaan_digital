// controllers/bookController.js
const Book = require('../models/bookModels');

// 1. Tambah Buku Baru
const createBook = async (req, res) => {
    try {
        const { judul, penulis, penerbit, tahun, stok } = req.body;

        if (!judul || !penulis) {
            return res.status(400).json({ message: "Judul dan Penulis wajib diisi, Lek!" });
        }

        const newBook = await Book.create({ judul, penulis, penerbit, tahun_terbit: tahun, stok });
        res.status(201).json({ message: "Buku berhasil ditambahkan!", data: newBook });
    } catch (error) {
        res.status(500).json({ message: "Error server!", error: error.message });
    }
};

// 2. Ambil Semua Daftar Buku
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.status(200).json({ message: "Daftar buku berhasil diambil", data: books });
    } catch (error) {
        res.status(500).json({ message: "Error server!", error: error.message });
    }
};

// 3. Edit Buku (Update)
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { judul, penulis, penerbit, tahun_terbit, stok } = req.body;

        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ message: "Buku tidak ditemukan!" });
        }

        await book.update({ judul, penulis, penerbit, tahun_terbit, stok });
        res.status(200).json({ message: "Buku berhasil diperbarui!", data: book });
    } catch (error) {
        res.status(500).json({ message: "Error server!", error: error.message });
    }
};

// 4. Hapus Buku (Delete)
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ message: "Buku tidak ditemukan!" });
        }

        await book.destroy();
        res.status(200).json({ message: "Buku berhasil dihapus!" });
    } catch (error) {
        res.status(500).json({ message: "Error server!", error: error.message });
    }
};

module.exports = { createBook, getAllBooks, updateBook, deleteBook };