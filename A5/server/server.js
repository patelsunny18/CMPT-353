'use strict';

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const PORT = 8080;
const HOST = "0.0.0.0";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

let connection = mysql.createConnection({
    host: 'mysql',
    port: '3306',
    user: 'root',
    password: 'admin'
});

connection.connect((err) => {
    if (err) {
        console.error(err);
    }

    connection.query("USE assignment;", (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Connected!");
        }
    });
});

app.post("/createPost", (req, res) => {
    let topic = req.body.topic;
    let data = req.body.data;
    let sort = req.body.sort;
    let d = new Date();

    let statement = `INSERT INTO posts (topic, data, timestamp) VALUES ('${topic}', '${data}', '${d.toISOString().slice(0, 19).replace('T', ' ')}')`;

    connection.query(statement, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            let statement;
            if (sort === "topic-ascend") {
                statement = 'SELECT * FROM posts ORDER BY topic ASC';
            } else if (sort === "topic-descend") {
                statement = 'SELECT * FROM posts ORDER BY topic DESC';
            } else if (sort === "time-ascend") {
                statement = 'SELECT * FROM posts ORDER BY timestamp ASC';
            } else if (sort === "time-descend") {
                statement = 'SELECT * FROM posts ORDER BY timestamp DESC';
            }
            connection.query(statement, (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    let resultArray = JSON.stringify(result);
                    res.send(resultArray);
                }
            });
        }
    });
});

app.use("/", express.static("."));

app.listen(PORT, HOST, () => {
    console.log("up and running...");
})