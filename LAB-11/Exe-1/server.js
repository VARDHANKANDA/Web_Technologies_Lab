//Simple HTTP Web Server

// Import required modules
const http = require('http');

// Define the server using createServer() method
const server = http.createServer((request, response) => {
    // Log incoming request details
    console.log(`Received ${request.method} request for: ${request.url}`);
    
    // Set appropriate response headers
    response.setHeader('Content-Type', 'text/html');
    response.setHeader('X-Powered-By', 'Node.js');
    response.statusCode = 200;
    
    // Prepare response content based on URL
    let responseContent = '';
    
    if (request.url === '/') {
        responseContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Node.js HTTP Server</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; text-align: center; }
                    h1 { color: #333; }
                    .info { background: #f0f0f0; padding: 20px; border-radius: 5px; }
                </style>
            </head>
            <body>
                <h1>Welcome to Node.js HTTP Server</h1>
                <div class="info">
                    <p>This server is created using Node.js built-in HTTP module</p>
                    <p>Current Time: ${new Date().toLocaleString()}</p>
                    <p>Available Routes:</p>
                    <ul style="list-style: none; padding: 0;">
                        <li><a href="/about">/about</a> - About page</li>
                        <li><a href="/api">/api</a> - API endpoint</li>
                    </ul>
                </div>
            </body>
            </html>
        `;
    } else if (request.url === '/about') {
        responseContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>About - Node.js Server</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    h1 { color: #555; }
                </style>
            </head>
            <body>
                <h1>About This Server</h1>
                <p>This is a simple HTTP server built with Node.js without any external frameworks.</p>
                <p>Features:</p>
                <ul>
                    <li>Handles HTTP requests and responses</li>
                    <li>Uses built-in http module</li>
                    <li>Sets appropriate response headers</li>
                </ul>
                <a href="/">Back to Home</a>
            </body>
            </html>
        `;
    } else if (request.url === '/api') {
        response.setHeader('Content-Type', 'application/json');
        responseContent = JSON.stringify({
            status: 'success',
            message: 'API endpoint is working',
            timestamp: new Date().toISOString(),
            server: 'Node.js HTTP Server'
        }, null, 2);
    } else {
        response.statusCode = 404;
        responseContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>404 - Page Not Found</title>
            </head>
            <body>
                <h1>404 - Page Not Found</h1>
                <p>The requested URL ${request.url} was not found on this server.</p>
                <a href="/">Go to Home</a>
            </body>
            </html>
        `;
    }
    
    // Send response using write() and end() methods
    response.write(responseContent);
    response.end();
});

// Run the server on a specific port using listen() method
const PORT = 3000;
server.listen(PORT, () => {
    // Display server status in the console
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📡 Server status: Active`);
    console.log(`🔄 Press Ctrl+C to stop the server`);
});

// Handle server errors
server.on('error', (error) => {
    console.error('Server error:', error.message);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n📴 Shutting down server...');
    server.close(() => {
        console.log('✅ Server closed successfully');
        process.exit(0);
    });
});