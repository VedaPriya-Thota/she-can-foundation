const express = require("express");

const {
  createMessage,
  getMessages,
  deleteMessage,
  updateMessageStatus,
} = require("../controllers/messageController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createMessage);

router.get("/", protect, getMessages);

router.delete("/:id", protect, deleteMessage);

router.patch("/:id/status", protect, updateMessageStatus);

module.exports = router;