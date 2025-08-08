const express = require('express');
const app = express();
const port = 3000;

// Serve static files from "public" directory
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`App running on port: ${port}`);
    console.log(`Open in browser: http://localhost:${port}`);
});