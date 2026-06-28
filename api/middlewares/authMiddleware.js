// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // 1. Ambil token dari header HTTP 'Authorization'
    const authHeader = req.headers['authorization'];
    
    // Format token biasanya: "Bearer token_acak_panjang"
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Akses ditolak, lo belum login atau gak bawa token, Lek!" });
    }

    try {
        // 2. Verifikasi token pake JWT_SECRET kita
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Simpan data user dari token ke request (req.user) biar bisa dipakai di controller
        req.user = verified;
        
        next(); // Lanjut ke fungsi controller utama
    } catch (error) {
        res.status(403).json({ message: "Token lo gak valid atau udah kedaluwarsa, Lek!" });
    }
};

module.exports = { verifyToken };