// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController'); // <--- Import login

router.post('/register', register);
router.post('/login', login); // <--- Tambahin ini Lek! POST /api/auth/login

module.exports = router;