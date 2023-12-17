import express from 'express';
const router = express.Router();
import Conversation from '../models/Conversation.js';

//new conv


// New conversation
router.post("/", async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    // Check if a conversation already exists for these two users
    const existingConversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (existingConversation) {
      // Conversation already exists, return it
      res.status(200).json(existingConversation);
    } else {
      // Conversation does not exist, create a new one
      const newConversation = new Conversation({
        members: [senderId, receiverId],
      });

      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//get all conversations
router.get("/", async (req, res) => {
  try {
    const conversation = await Conversation.find();
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});



export default router;
