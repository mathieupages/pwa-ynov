const express = require('express');
const app = express();
const webpush = require("web-push");
const bodyParser = require("body-parser");
//const path = require("path");
let jsonData = require('./imageData.json');

app.use(express.static(path.join(__dirname, "client")));

const publicVapidKey = "BOz-y7a0En0i6slG6L - jMR6EmwTel18PAO8CLX0ECOIWeNGYo3DKXdMwN0LrmpulqE1CKl6VUMCQRW9 - _7iXU8Y"
const privateVapidKey = "rUBLUV3xcpIaMj91cTb66xBO-ljVo6u1piFOcZAGisg"

webpush.setVapidDetails(
    "mailto:mathieu.pages@ynov.com",
    publicVapidKey,
    privateVapidKey
  );

app.use(express.static(__dirname + '/../client')); // replace to dist when production
app.listen(3000, function() {
    console.log('listening on 3000')
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/images', (req, res) => {
    res.json(jsonData).end();
});

app.get('/favorite', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`${ip} fall in love :`, req.image);

    const payload = JSON.stringify({ title: "Push Test" });
    const favorite = req.body;

    webpush
        .sendNotification(favorite, payload)
        .catch(err => console.error(err));

    res.end();
});