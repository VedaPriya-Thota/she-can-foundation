const Message = require("../models/Message");
const { sendSubmissionEmails } = require("../utils/emailService");

const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newMessage = await Message.create({
      name,
      email,
      message,
    });

    // Fire email notifications in background to optimize client response latency
    sendSubmissionEmails(newMessage).catch((error) => {
      console.error("Background email dispatch failed:", error);
    });

    res.status(201).json({
      success: true,
      data: newMessage,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: messages,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Message deleted",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateMessageStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !["New", "Reviewed", "Responded"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedMessage,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createMessage,
  getMessages,
  deleteMessage,
  updateMessageStatus,
};