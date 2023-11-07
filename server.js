const axios = require("axios");
const cors = require('cors');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());
app.options('*', cors());
// Choose a port number 
const port = 3001;

// Define your routes here 
app.post('/api/data', (req, res) => {
    console.log(req.body.url);

    axios.get(req.body.url).then(resp => {

        res.json(resp.data);
    })
});

// Start the server 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
