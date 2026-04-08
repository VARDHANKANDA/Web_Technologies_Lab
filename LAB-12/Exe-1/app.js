const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import routes
const userRoutes = require('./routes/users');

// Use routes
app.use('/users', userRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('REST API Server is running...');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});