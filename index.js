// Fetches environment variables set in the .env file at the root of the project
// (next to index.js)
require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;

// Serve static files from "public" directory
app.use(express.static('public'));

// Middleware to check API key in request headers
app.use(express.json());

app.get('/api/pokemon/:id', async (req, res) => {
    const apiKey = process.env.API_KEY;
    // fake scenario to show how we can access api keys in .env
    // we can then send this with requests if necessary
    if (!apiKey) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const id = req.params.id;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();

        // Extract name and front_default sprite
        const result = {
            name: data.name,
            front_default: data.sprites.front_default
        };

        res.json(result);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Failed to fetch Pokemon data.' });
    }
});


app.listen(port, () => {
    console.log(`App running on port: ${port}`);
    console.log(`Open in browser: http://localhost:${port}`);
});