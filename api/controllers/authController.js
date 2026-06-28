// controllers/authController.js
const User = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // <--- Import JWT

// --- FUNGSI REGISTER (Tetap Sama) ---
const register = async (req, res) => {
    try {
        const { nama, email, password, role } = req.body;
        if (!nama || !email || !password) {
            return res.status(400).json({ message: "Nama, email, dan password wajib diisi, Lek!" });
        }
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: "Email ini udah dipake orang lain, Lek!" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            nama, email, password: hashedPassword, role: role || 'anggota'
        });
        res.status(201).json({
            message: "Registrasi berhasil!",
            user: { id: newUser.id, nama: newUser.nama, email: newUser.email, role: newUser.role }
        });
    } catch (error) {
        res.status(500).json({ message: "Error server!", error: error.message });
    }
};

// --- FUNGSI LOGIN BARU ---
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validasi input
        if (!email || !password) {
            return res.status(400).json({ message: "Email dan password harus diisi, Lek!" });
        }

        // 2. Cari user berdasarkan email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Email atau password salah, Lek!" });
        }

        // 3. Cek apakah password-nya cocok (pake bcrypt.compare)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Email atau password salah, Lek!" });
        }

        // 4. Bikin token JWT untuk karcis masuk si user (berlaku 1 hari)
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // 5. Kirim data user beserta tokennya
        res.status(200).json({
            message: "Login berhasil! Mantap Lek.",
            token,
            user: {
                id: user.id,
                nama: user.nama,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Waduh, ada error di server!", error: error.message });
    }
};

// Export kedua fungsinya biar bisa dipanggil routes
module.exports = { register, login };