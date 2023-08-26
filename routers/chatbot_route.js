const express = require('express');
const { User, Chatbot } = require('../models'); // Adjust the paths as needed
const router = express.Router();

// POST /users/:userId/chatbots - Create a new chatbot for a user
router.post('/:userId/chatbots', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, description } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newChatbot = await Chatbot.create({ name, description, UserId: userId });

    res.status(201).json(newChatbot);
  } catch (error) {
    console.error('Error creating chatbot:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /users/:userId/chatbots - List all chatbots for a user
router.get('/:userId/chatbots', async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByPk(userId, {
      include: [{ model: Chatbot }],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.Chatbots);
  } catch (error) {
    console.error('Error fetching chatbots:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /chatbots/:chatbotId - Retrieve a single chatbot
router.get('/chatbots/:chatbotId', async (req, res) => {
  try {
    const chatbotId = req.params.chatbotId;

    const chatbot = await Chatbot.findByPk(chatbotId);

    if (!chatbot) {
      return res.status(404).json({ message: 'Chatbot not found' });
    }

    res.json(chatbot);
  } catch (error) {
    console.error('Error fetching chatbot:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /chatbots/:chatbotId - Update a chatbot
router.put('/chatbots/:chatbotId', async (req, res) => {
  try {
    const chatbotId = req.params.chatbotId;
    const { name, description } = req.body;

    const chatbot = await Chatbot.findByPk(chatbotId);

    if (!chatbot) {
      return res.status(404).json({ message: 'Chatbot not found' });
    }

    chatbot.name = name;
    chatbot.description = description;
    await chatbot.save();

    res.json(chatbot);
  } catch (error) {
    console.error('Error updating chatbot:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /chatbots/:chatbotId - Delete a chatbot
router.delete('/chatbots/:chatbotId', async (req, res) => {
  try {
    const chatbotId = req.params.chatbotId;

    const chatbot = await Chatbot.findByPk(chatbotId);

    if (!chatbot) {
      return res.status(404).json({ message: 'Chatbot not found' });
    }

    await chatbot.destroy();

    res.json({ message: 'Chatbot deleted successfully' });
  } catch (error) {
    console.error('Error deleting chatbot:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
