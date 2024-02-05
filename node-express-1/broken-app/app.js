const express = require('express');
const axios = require('axios');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/', async function(req, res, next) {
  try {
    // Use Promise.all to wait for all axios requests to resolve
    let results = await Promise.all(req.body.developers.map(d => axios.get(`https://api.github.com/users/${d}`)));

    // Map over the resolved promises to extract the required information
    let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

    // Send the response as JSON
    res.json(out); // Express can stringify and set the correct Content-Type header
  } catch (err) { // Make sure to catch and pass any errors to the next error handler
    next(err);
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
