const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// post project
router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get all OPEN projects (for editors finding work)
router.get("/", async (req, res) => {
  try {
    // Filter: Open status AND deadline is in the future (or today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const projects = await Project.find({
      status: "Open",
      deadline: { $gte: today }
    }).populate('clientId', 'name');
    res.send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get projects by client (My Posted Projects)
router.get("/my-projects/:clientId", async (req, res) => {
  try {
    const projects = await Project.find({ clientId: req.params.clientId })
      .populate('applicants', 'name email')
      .populate('assignedTo', 'name email');
    res.send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get projects assigned to editor (My Work)
router.get("/assigned/:editorId", async (req, res) => {
  try {
    const projects = await Project.find({ assignedTo: req.params.editorId })
      .populate('clientId', 'name email');
    res.send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
});

// apply to project
router.post("/:id/apply", async (req, res) => {
  try {
    const { userId } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project.applicants.includes(userId)) {
      project.applicants.push(userId);
      await project.save();
    }
    res.send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// assign editor (hire)
router.put("/:id/assign", async (req, res) => {
  try {
    const { editorId } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { assignedTo: editorId, status: "In Progress" },
      { new: true }
    );
    res.send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// update status (finish/pay)
router.put("/:id/status", async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const updateData = {};
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
