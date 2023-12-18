import express from 'express';
const router = express.Router();
import Conversation from '../models/Conversation.js';
import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';
import Admin from '../models/Admin.js';

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


router.get("/getUserById/:id", async (req, res) => {
  const { id } = req.params;

  try {
      // Try to find the user in each collection
      const patient = await Patient.findById(id);
      if (patient) {
          return res.status(200).json(patient);
      }
      const doctor = await Doctor.findById(id);
      if (doctor) {
          return res.status(200).json(doctor);
      }
      const admin = await Admin.findById(id);
      if (admin) {
          return res.status(200).json(admin);
      }

      

      // If none of the above, user not found
      res.status(404).json({ error: 'User not found' });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

export default router;
