const express = require('express');
const {
  registerUser,
  loginUser,
  getCurrentUser
} = require('../controllers/user.controllers');
const { protect } = require('../middlewares/auth.middleware')

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/current-user', protect, getCurrentUser);

module.exports = router;
