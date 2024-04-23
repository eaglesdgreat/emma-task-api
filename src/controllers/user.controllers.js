const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '5d' });

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('All fields are mandatory');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400)
    throw new Error('User Exists.');
  }

  // encrypt user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201).json({ _id: user.id, name: user.name, email: user.email, token: generateToken(user.id) });
  } else {
    res.status(400)
    throw new Error('Invalid user data.');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400)
    throw new Error('All fields are mandatory');
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({ _id: user.id, name: user.name, email: user.email, token: generateToken(user.id) });
  } else {
    res.status(400)
    throw new Error('Invalid user data.');
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({ _id, name, email });
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
}
