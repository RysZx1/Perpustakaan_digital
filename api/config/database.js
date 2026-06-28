// config/database.js
require('mysql2'); // <--- Tambahin ini di baris paling atas Lek!
const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 27576, // <--- Tambahin baris ini Lek!
        dialect: 'mysql',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Biar aman tembus SSL Cloud tanpa download sertifikat
            }
        }
    }
);

module.exports = sequelize;