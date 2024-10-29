
const User = require('../models/User');
const jwt = require('jsonwebtoken');

 
    
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already exists' });

    const user = new User({ name, email, password });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


    
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'User not found' });
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn:process.env.JWT_EXPIRES_IN });
      res.status(200).json({ token, user: { id: user._id, email: user.email, name: user.name } });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  
