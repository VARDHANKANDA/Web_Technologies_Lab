const express = require('express');
const router = express.Router();
const User = require('../models/User');


// CREATE user
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json({
            message: "User created successfully",
            data: user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// GET single user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// UPDATE user
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            message: "User updated",
            data: updatedUser
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;