// models/borrowModels.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModels');
const Book = require('./bookModels');

const Borrow = sequelize.define('Borrow', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tanggal_pinjam: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    tanggal_kembali: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('dipinjam', 'dikembalikan'),
        defaultValue: 'dipinjam'
    }
}, {
    timestamps: true
});

// Bikin relasi antar tabel Lek (Satu user bisa pinjam banyak buku, satu buku bisa dipinjam banyak user)
Borrow.belongsTo(User, { foreignKey: 'UserId' });
Borrow.belongsTo(Book, { foreignKey: 'BookId' });

module.exports = Borrow;