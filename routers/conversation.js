const express = require('express');
const router = express.Router();

const { Conversation, Chatbot, EndUser } = require('../models'); // Adjust the path as needed

// POST /chatbots/:chatbotId/conversations - Start a new conversation for a chatbot
router.post('/:chatbotId/conversations', async (req, res) => {
  try {
    const chatbotId = req.params.chatbotId;
    const { message, endUserId } = req.body;

    const chatbot = await Chatbot.findByPk(chatbotId);
    if (!chatbot) {
      return res.status(404).json({ message: 'Chatbot not found' });
    }

    const endUser = await EndUser.findByPk(endUserId);
    if (!endUser) {
      return res.status(404).json({ message: 'End user not found' });
    }

    const newConversation = await Conversation.create({
      message,
      ChatbotId: chatbotId,
      EndUserId: endUserId,
    });

    res.status(201).json(newConversation);
  } catch (error) {
    console.error('Error starting conversation:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /chatbots/:chatbotId/conversations - List all conversations for a chatbot
router.get('/:chatbotId/conversations', async (req, res) => {
  try {
    const chatbotId = req.params.chatbotId;

    const chatbot = await Chatbot.findByPk(chatbotId, {
      include: [{ model: Conversation, include: [{ model: EndUser }] }],
    });

    if (!chatbot) {
      return res.status(404).json({ message: 'Chatbot not found' });
    }

    res.json(chatbot.Conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /conversations/:conversationId - Retrieve a single conversation
router.get('/conversations/:conversationId', async (req, res) => {
  try {
    const conversationId = req.params.conversationId;

    const conversation = await Conversation.findByPk(conversationId, {
      include: [{ model: Chatbot }, { model: EndUser }],
    });

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    res.json(conversation);
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /conversations/:conversationId - Update a conversation (e.g., mark as completed)
router.put('/conversations/:conversationId', async (req, res) => {
  try {
    const conversationId = req.params.conversationId;

    const conversation = await Conversation.findByPk(conversationId);

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    // Your code to update the conversation (e.g., mark as completed)

    res.json(conversation);
  } catch (error) {
    console.error('Error updating conversation:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /conversations/:conversationId - End/delete a conversation
router.delete('/conversations/:conversationId', async (req, res) => {
  try {
    const conversationId = req.params.conversationId;

    const conversation = await Conversation.findByPk(conversationId);

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    await conversation.destroy();

    res.json({ message: 'Conversation deleted successfully' });
  } catch (error) {
    console.error('Error deleting conversation:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
