const express = require('express');
const app = express();
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
var cors = require('cors')
let jsonData = require('./imageData.json');

app.use(cors());
//app.use(express.static(path.join(__dirname, "client")));

const publicVapidKey = "BOz-y7a0En0i6slG6L - jMR6EmwTel18PAO8CLX0ECOIWeNGYo3DKXdMwN0LrmpulqE1CKl6VUMCQRW9 - _7iXU8Y"
const privateVapidKey = "rUBLUV3xcpIaMj91cTb66xBO-ljVo6u1piFOcZAGisg"

webpush.setVapidDetails(
    "mailto:mathieu.pages@ynov.com",
    publicVapidKey,
    privateVapidKey
  );

app.use(express.static(__dirname + '/../client')); // replace to dist when production


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/images', (req, res) => {
    res.json(jsonData).end();
});

app.get('/favorite', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    const payload = JSON.stringify({ title: "Push Test" });
    const favorite = req.query.image;
    console.log(`${ip} fall in love :`, favorite);

    // webpush
    //     .sendNotification(favorite, payload)
    //     .catch(err => console.error(err));

    res.end();
});

app.use(function(err, req, res, next) {
    console.error(err);
    if(err.message)
      res.locals.message = err.message;
    else
      res.locals.error = err;
  
    res.status(err.status || 500)
      .send(err.message)
      .end();
  });

app.listen(3000, function() {
    console.log('listening on 3000')
});