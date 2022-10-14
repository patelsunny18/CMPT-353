'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/save', (req, res) => {
    let topic = req.body.topic;
    let name = req.body.name;
    let comment = req.body.comment;

    let feedback = `Topic: ${topic}, Name: ${name}, Comment: ${comment}\n`;

    fs.writeFile('feedback.txt', feedback, { flag: 'a+' }, err => {
        if (err) {
            console.log(err);
            return;
        }
        res.send('Your feedback has been received!');
    });
});

app.use('/', express.static('files'));

app.listen(PORT, HOST);
console.log("up and running!");

