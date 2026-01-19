const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Project = require("../models/Project");

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
    try {
        const { adminId } = req.body;
        if (!adminId) {
            return res.status(401).send({ message: "Admin ID required" });
        }
        const user = await User.findById(adminId);
        if (!user || user.role !== 'admin') {
            return res.status(403).send({ message: "Access denied. Admin only." });
        }
        next();
    } catch (error) {
        res.status(500).send(error);
    }
};

// ============ STATISTICS ============
router.post("/stats", isAdmin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProjects = await Project.countDocuments();
        const clients = await User.countDocuments({ role: 'client' });
        const editors = await User.countDocuments({ role: 'editor' });

        const projects = await Project.find();
        const totalRevenue = projects.reduce((sum, p) => sum + (parseFloat(p.budget) || 0), 0);

        res.send({
            totalUsers,
            totalProjects,
            clients,
            editors,
            totalRevenue,
            openProjects: await Project.countDocuments({ status: 'Open' }),
            inProgress: await Project.countDocuments({ status: 'In Progress' }),
            completed: await Project.countDocuments({ status: 'Completed' }),
            paid: await Project.countDocuments({ status: 'Paid' })
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// ============ USER MANAGEMENT ============
router.post("/users", isAdmin, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/users/:id", isAdmin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.send({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put("/users/:id", isAdmin, async (req, res) => {
    try {
        const { name, email, role, gender, dob } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, role, gender, dob },
            { new: true }
        ).select('-password');
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Create user (admin only)
router.post("/create-user", isAdmin, async (req, res) => {
    try {
        const { name, email, password, role, gender, dob } = req.body;
        const user = new User({ name, email, password, role, gender, dob });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// ============ PROJECT MANAGEMENT ============
router.post("/projects", isAdmin, async (req, res) => {
    try {
        const projects = await Project.find()
            .populate('clientId', 'name email')
            .populate('assignedTo', 'name email')
            .populate('applicants', 'name email');
        res.send(projects);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/projects/:id", isAdmin, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.send({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put("/projects/:id", isAdmin, async (req, res) => {
    try {
        const { title, description, budget, deadline, status, paymentStatus } = req.body;
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { title, description, budget, deadline, status, paymentStatus },
            { new: true }
        );
        res.send(project);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Create project (admin only)
router.post("/create-project", isAdmin, async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).send(project);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
