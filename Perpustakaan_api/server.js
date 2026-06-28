// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); 

// Import Models
const User = require('./models/userModels');
const Book = require('./models/bookModels');
const Borrow = require('./models/borrowModels');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Main Routing Endpoints
app.use('/api/auth', authRoutes); 
app.use('/api/books', bookRoutes);
app.use('/api/borrows', borrowRoutes);

// Base Route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Digital Library API, Lek!" });
});

// Start Database & Server Listener
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully... (Aman Lek!)');
        
        await sequelize.sync({ alter: true });
        console.log('All models synchronized successfully!');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();