// Import required modules
const http = require('http');
const EventEmitter = require('events');

// Create EventEmitter object
const eventEmitter = new EventEmitter();

// Define host and port
const HOST = '127.0.0.1';
const PORT = 3000;

// -------------------- EVENT LISTENERS --------------------

// Listener 1
eventEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
});

// Listener 2 (multiple listeners)
eventEmitter.on('greet', (name) => {
    console.log(`Welcome to Node.js, ${name}!`);
});

// Custom event
eventEmitter.on('dataEvent', (data) => {
    console.log(`Data received: ${data}`);
});

// Async event
eventEmitter.on('asyncEvent', (msg) => {
    console.log(`Async Event: ${msg}`);
});


// -------------------- CREATE SERVER --------------------
const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'text/plain');

    console.log("Client request received");

// Emit events when browser hits localhost
    eventEmitter.emit('greet', 'Student');
    eventEmitter.emit('dataEvent', 'Event Triggered from Browser');

    // Async event
    setTimeout(() => {
        eventEmitter.emit('asyncEvent', 'Delayed execution');
    }, 2000);

    res.write('Events triggered! Check console output.');
    res.end();
});


// -------------------- START SERVER --------------------
server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});