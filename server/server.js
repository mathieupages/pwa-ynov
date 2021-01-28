const express = require('express');
const app = express();
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
var cors = require('cors')
let jsonData = require('./imageData.json');
let subs = [];

app.use(cors());
app.use(bodyParser.json())

const publicVapidKey = "BOz-y7a0En0i6slG6L-jMR6EmwTel18PAO8CLX0ECOIWeNGYo3DKXdMwN0LrmpulqE1CKl6VUMCQRW9-_7iXU8Y";
const privateVapidKey = "rUBLUV3xcpIaMj91cTb66xBO-ljVo6u1piFOcZAGisg";

webpush.setVapidDetails(
    "mailto:mathieu.pages@ynov.com",
    publicVapidKey,
    privateVapidKey
  );

app.use(express.static(__dirname + '/../client')); // replace to dist when production


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/paths', (req, res) => {
    const data = JSON.stringify(jsonData.map(image => image.src));
    res.send(data).end();
});

app.get('/images', (req, res) => {
    res.json(jsonData).end();
});

app.post('/sub', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const indexFound = subs.find(sub => sub.ip == ip);
    if(indexFound > 0) {
        subs[indexFound].sub = sub;
    } else {
        subs.push({ip, sub: req.body});
    }
    res.end();
});

app.get('/favorite', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    const favorite = req.query.image;
    const payload = JSON.stringify({ title: `${ip} fall in love : ${favorite}` });
    console.log(payload);

    const getSubscription = (ip)=> {
        return subs.filter(sub => sub.ip == ip)[0];
    };

    const pushSubscription = getSubscription(ip);

    webpush
        .sendNotification(pushSubscription.sub, payload)
        .catch(err => console.error(err));

    res.end();
});
app.post('/add', (req,res) => {
    console.log("toto ",req.body);
  const src = req.body.src;
  console.log("tata ",src);
  jsonData.push({id : `${jsonData.length +1}`, src});
  console.log("TOTO " , jsonData);
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