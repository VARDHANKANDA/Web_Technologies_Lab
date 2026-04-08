const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Import Routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Root route to avoid "Cannot GET /"
app.get('/', (req, res) => {
    res.send("Node.js MongoDB CRUD API is running 🚀");
});

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/userDB')
.then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
.catch(err => {
    console.log("Database connection error:", err);
});