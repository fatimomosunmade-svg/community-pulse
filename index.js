const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// In-memory "database" for now.
let issues = [
    { id: 1, type: 'Pothole', location: 'Main St', description: 'A large pothole near the intersection', status: 'Reported' },
    { id: 2, type: 'Broken Streetlight', location: 'Elm St', description: 'Light has been out for 3 days', status: 'Fixed' }
];
let nextId = 3;

// Middleware to parse JSON bodies.
app.use(express.json());
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// EXPLICITLY send index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET /api/issues - Returns the list of issues
app.get('/api/issues', (req, res) => {
    res.json(issues);
});

// POST /api/issues - Creates a new issue
app.post('/api/issues', (req, res) => {
    console.log('Received new issue report:', req.body);

    const newIssue = {
        id: nextId++,
        type: req.body.type,
        location: req.body.location,
        description: req.body.description,
        status: 'Reported'
    };

    issues.push(newIssue);
    res.json(newIssue);
});

// Start the server
app.listen(port, () => {
    console.log(`Community Pulse server running on port ${port}`);
});
