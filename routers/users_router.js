const express = require('express');
const { User } = require('../models'); // Adjust the path to your models
const router = express.Router();

// POST /users - Create a new user
router.post('/', async (req, res) => {
    try {
      const { username } = req.body;
      const newUser = await User.create({ username });
  
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // GET /users - List all users
  router.get('/', async (req, res) => {
    try {
      const users = await User.findAll();
  
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // GET /users/:id - Retrieve a single user
  router.get('/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // PUT /users/:id - Update a user
  router.put('/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const { username } = req.body;
  
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.username = username;
      await user.save();
  
      res.json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // DELETE /users/:id - Delete a user
  router.delete('/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      await user.destroy();
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  module.exports = router;