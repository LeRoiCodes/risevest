const express = require('express');
const { register, login } = require('../controllers/auth');
const authMiddleware = require("../middlewares/authMiddleware")
const {getUser} = require("../controllers/userController")



const router = express.Router();

router.post('/register', register)
router.post('/login', login )
router.get('/profile', authMiddleware, getUser)

module.exports = router;