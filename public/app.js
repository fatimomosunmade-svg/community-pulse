// This function will load existing issues from our server
async function loadIssues() {
    try {
        const response = await fetch('/api/issues');
        const issues = await response.json();
        const issuesList = document.getElementById('issue-list');

        // Clear the current list
        issuesList.innerHTML = '<h3>Loading...</h3>';

        if (issues.length === 0) {
            issuesList.innerHTML = '<p>No issues reported yet. Be the first!</p>';
            return;
        }

        // Build the HTML for the list of issues
        let html = '';
        issues.forEach(issue => {
            html += `
                <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
                    <strong>${issue.type}</strong> at <em>${issue.location}</em>
                    <br><span>Status: ${issue.status}</span>
                </div>
            `;
        });

        issuesList.innerHTML = html;
    } catch (error) {
        console.error("Error loading issues:", error);
        document.getElementById('issue-list').innerHTML = '<p>Failed to load issues.</p>';
    }
}

// This function handles the form submission
document.getElementById('issueForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get the form data
    const formData = {
        type: document.getElementById('issueType').value,
        location: document.getElementById('location').value,
        description: document.getElementById('description').value,
        status: 'Reported' // Default status
    };

    try {
        // Send the data to our server
        const response = await fetch('/api/issues', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        document.getElementById('message').innerHTML = `<p style="color: green;">Thank you! Your report has been submitted. (ID: ${result.id})</p>`;
        
        // Clear the form
        document.getElementById('issueForm').reset();
        
        // Reload the issues list to show the new one
        loadIssues();

    } catch (error) {
        console.error('Error submitting report:', error);
        document.getElementById('message').innerHTML = '<p style="color: red;">Failed to submit report. Please try again.</p>';
    }
});

// Load issues when the page finishes loading
document.addEventListener('DOMContentLoaded', loadIssues);
