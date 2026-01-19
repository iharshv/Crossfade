const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  budget: String,
  videoLink: String,
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deadline: Date,
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Completed', 'Paid'],
    default: "Open"
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Done'],
    default: "Pending"
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Project", projectSchema);
