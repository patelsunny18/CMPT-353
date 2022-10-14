'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const HOST = '0.0.0.0';
const PORT = 8080;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

function postmessage(topic, data) {
    let post = `Topic: ${topic}\nData: ${data}\nTime posted: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}\n\n`;

    try {
        fs.writeFileSync('./posts.txt', post, { flag: 'a+' });
        // alert("hello");
    } catch (error) {
        console.error(error);
    }
}

app.get('/getFile', (req, res) => {
    fs.readFile('./posts.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(data);
    });
});

app.post('/post', (req, res) => {
    let topic = req.body.topic;
    let data = req.body.data;
    postmessage(topic, data);
});

app.use('/', express.static('./'));

app.listen(PORT, HOST, () => {
    console.log('up and running...');
});