const express = require('express');
const app = express();
// Use the port provided by the cloud host, or 3000 for local testing
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies. This is crucial for reading data from our form!
app.use(express.json());
app.use(express.static('public'));

// In-memory "database" for now. This will reset every time the server restarts.
let issues = [
    { id: 1, type: 'Pothole', location: 'Main St', description: 'A large pothole near the intersection', status: 'Reported' },
    { id: 2, type: 'Broken Streetlight', location: 'Elm St', description: 'Light has been out for 3 days', status: 'Fixed' }
];
let nextId = 3; // The next ID to use for a new issue

// GET /api/issues - Returns the list of issues
app.get('/api/issues', (req, res) => {
    res.json(issues);
});

// POST /api/issues - Creates a new issue
app.post('/api/issues', (req, res) => {
    // Log the received data to the console so we can see it working!
    console.log('Received new issue report:', req.body);

    // Create a new issue object
    const newIssue = {
        id: nextId++,
        type: req.body.type,
        location: req.body.location,
        description: req.body.description,
        status: 'Reported' // Always set initial status to Reported
    };

    // Add it to our array
    issues.push(newIssue);

    // Send back the new issue as a response, including its new ID
    res.json(newIssue);
});

// Start the server
app.listen(port, () => {
    console.log(`Community Pulse server running on port ${port}`);
});
