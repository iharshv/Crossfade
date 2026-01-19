const express = require("express");
const router = express.Router();
const User = require("../models/User");

// signup
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = new User({ name, email, password, role });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) {
            res.send(user);
        } else {
            res.status(400).send({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// update user
router.put("/update", async (req, res) => {
    try {
        const { _id, name, gender, dob } = req.body;
        const user = await User.findByIdAndUpdate(_id, { name, gender, dob }, { new: true });
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
