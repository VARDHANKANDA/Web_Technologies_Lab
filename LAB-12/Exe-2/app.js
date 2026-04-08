const express = require('express');
const app = express();

// ---------------- GLOBAL MIDDLEWARE ----------------

// Middleware 1: Log request details
app.use((req, res, next) => {
    console.log("Middleware 1: Logger");
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.url}`);
    console.log(`Time: ${new Date().toISOString()}`);
    console.log("-----------------------------");
    next(); // move to next middleware
});

// Middleware 2: Example processing
app.use((req, res, next) => {
    console.log("Middleware 2: Processing request");
    req.customMessage = "Hello from Middleware";
    next();
});

// ---------------- ROUTE-LEVEL MIDDLEWARE ----------------

const checkAuth = (req, res, next) => {
    console.log("Middleware 3: Route-level Authentication");
    const isLoggedIn = true; // change to false to test

    if (isLoggedIn) {
        next();
    } else {
        res.send("Access Denied");
    }
};

// ---------------- ROUTES ----------------

// Route without route-level middleware
app.get('/', (req, res) => {
    console.log("Final Handler: Home Route");
    res.send("Welcome to Middleware Demo Server");
});

// Route with middleware chaining
app.get('/dashboard', checkAuth, (req, res) => {
    console.log("Final Handler: Dashboard Route");
    res.send(req.customMessage + " - Welcome to Dashboard");
});

// Another route
app.get('/about', (req, res) => {
    console.log("Final Handler: About Route");
    res.send("About Page");
});

// ---------------- SERVER ----------------

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});