const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Important for cloud hosting!

app.use(express.static('public'));

app.get('/api/issues', (req, res) => {
  const fakeIssues = [
    { id: 1, type: 'Pothole', location: 'Main St', status: 'Reported' },
    { id: 2, type: 'Broken Streetlight', location: 'Elm St', status: 'Fixed' }
  ];
  res.json(fakeIssues);
});

app.listen(port, () => {
  console.log(`Community Pulse app listening...`);
});
