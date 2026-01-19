const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const Project = require("../models/Project");

// Get messages for a project
router.get("/:projectId", async (req, res) => {
    try {
        const { userId } = req.query;
        const { projectId } = req.params;

        // Fetch project to check authorization
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).send({ message: "Project not found" });
        }

        // Check if user is authorized (client, assigned editor, or admin)
        const User = require("../models/User");
        const user = await User.findById(userId);

        const isAuthorized =
            user.role === 'admin' ||
            project.clientId.toString() === userId ||
            (project.assignedTo && project.assignedTo.toString() === userId);

        if (!isAuthorized) {
            return res.status(403).send({ message: "Unauthorized" });
        }

        // Fetch messages
        const messages = await Message.find({ projectId }).sort({ timestamp: 1 });
        res.send(messages);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Send a message
router.post("/", async (req, res) => {
    try {
        const { projectId, userId, message } = req.body;

        // Fetch project and user
        const project = await Project.findById(projectId);
        const User = require("../models/User");
        const user = await User.findById(userId);

        if (!project || !user) {
            return res.status(404).send({ message: "Project or user not found" });
        }

        // Check authorization
        const isAuthorized =
            user.role === 'admin' ||
            project.clientId.toString() === userId ||
            (project.assignedTo && project.assignedTo.toString() === userId);

        if (!isAuthorized) {
            return res.status(403).send({ message: "Unauthorized" });
        }

        // Create message
        const newMessage = new Message({
            projectId,
            sender: userId,
            senderName: user.name,
            senderRole: user.role,
            message
        });

        await newMessage.save();
        res.status(201).send(newMessage);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
