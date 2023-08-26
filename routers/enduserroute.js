const express = require('express');
const router = express.Router();

const { EndUser } = require('../models'); // Adjust the path as needed

// POST /endusers - Register a new end user
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;

    const newEndUser = await EndUser.create({ name, email });

    res.status(201).json(newEndUser);
  } catch (error) {
    console.error('Error registering end user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /endusers - List all end users
router.get('/', async (req, res) => {
  try {
    const endUsers = await EndUser.findAll();

    res.json(endUsers);
  } catch (error) {
    console.error('Error fetching end users:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /endusers/:endUserId - Retrieve details of a single end user
router.get('/:endUserId', async (req, res) => {
  try {
    const endUserId = req.params.endUserId;

    const endUser = await EndUser.findByPk(endUserId);

    if (!endUser) {
      return res.status(404).json({ message: 'End user not found' });
    }

    res.json(endUser);
  } catch (error) {
    console.error('Error fetching end user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /endusers/:endUserId - Update end user details
router.put('/:endUserId', async (req, res) => {
  try {
    const endUserId = req.params.endUserId;
    const { name, email } = req.body;

    const endUser = await EndUser.findByPk(endUserId);

    if (!endUser) {
      return res.status(404).json({ message: 'End user not found' });
    }

    endUser.name = name;
    endUser.email = email;
    await endUser.save();

    res.json(endUser);
  } catch (error) {
    console.error('Error updating end user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /endusers/:endUserId - Delete an end user
router.delete('/:endUserId', async (req, res) => {
  try {
    const endUserId = req.params.endUserId;

    const endUser = await EndUser.findByPk(endUserId);

    if (!endUser) {
      return res.status(404).json({ message: 'End user not found' });
    }

    await endUser.destroy();

    res.json({ message: 'End user deleted successfully' });
  } catch (error) {
    console.error('Error deleting end user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
