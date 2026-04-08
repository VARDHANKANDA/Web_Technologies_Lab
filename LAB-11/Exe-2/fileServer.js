// Import required modules
const http = require('http');
const fs = require('fs');

// Define hostname and port
const HOST = '127.0.0.1';
const PORT = 3000;

// Create server
const server = http.createServer((req, res) => {

    // Set response header
    res.setHeader('Content-Type', 'text/plain');

    console.log('Request received');

// -------------------- STEP 1: CREATE FILE --------------------
    fs.writeFile('sample.txt', 'Hello, File Created Successfully!\n', (err) => {
        if (err) {
            console.error('Error creating file:', err);
            res.end('Error creating file');
            return;
        }
        console.log('File created successfully');

// -------------------- STEP 2: APPEND DATA --------------------
        fs.appendFile('sample.txt', 'This is appended content.\n', (err) => {
            if (err) {
                console.error('Error appending file:', err);
                res.end('Error appending file');
                return;
            }
            console.log('Data appended successfully');

// -------------------- STEP 3: READ FILE --------------------
            fs.readFile('sample.txt', 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    res.end('Error reading file');
                    return;
                }
                console.log('File read successfully');

                res.write('File Content:\n');
                res.write(data);

// -------------------- STEP 4: DELETE FILE --------------------
                fs.unlink('sample.txt', (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                        res.end('\nError deleting file');
                        return;
                    }
                    console.log('File deleted successfully');

                    res.write('\nFile deleted successfully');
                    res.end();
                });

            });
        });
    });
});

// Start server
server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});