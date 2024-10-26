const express = require('express');
const router = express.Router();
const {register, login} = require('../controllers/auth')

router.post('/register', register);
router.post('/login', login);

module.exports = router

// Questions
// Why login and register routes should be post route not get route ? 