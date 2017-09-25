require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const https = require('https');
var parseString = require('xml2js').parseString;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../build/')));

// Put all API endpoints under '/api'
app.get('/api/find-buses', (req, res) => {
  var transLinkApiKey = process.env.REACT_APP_TRANSLINK_API_KEY;
  https.get(`https://api.translink.ca/rttiapi/v1/buses?apikey=${transLinkApiKey}`, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      var allBuses = parseString(data);
      res.send(allBuses);
    });
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/../build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Bus plotter listening on ${port}`);
