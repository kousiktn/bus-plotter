require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const https = require('https');
var parseString = require('xml2js').parseString;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/find-buses', (req, res) => {
  var transLinkApiKey = process.env.REACT_APP_TRANSLINK_API_KEY;
  https.get(`https://api.translink.ca/rttiapi/v1/buses?apikey=${transLinkApiKey}`, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      parseString(data, (err, parsedXml) => {
        if (err) {
          console.error(err);
          res.status(500).send({error: err })
        } else {
          var busLocationData = [];
          const allBuses = parsedXml["Buses"]["Bus"];
          for (var i = 0; i < allBuses.length; ++i) {
            var busDict = allBuses[i];
            busLocationData.push({
              0: busDict["Latitude"][0],
              1: busDict["Longitude"][0],
              2: busDict["Direction"][0][0],
            });
          }
          res.send(busLocationData);
        }
      });
    });
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Bus plotter listening on ${port}`);
