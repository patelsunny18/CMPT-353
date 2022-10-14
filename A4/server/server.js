'use strict';

const express = require("express");
const bodyParser = require("body-parser");
const nano = require("nano")("http://admin:password@couchdb:5984");
const posts = nano.use('posts');

const PORT = 8080;
const HOST = "0.0.0.0";

const app = express();

app.use(bodyParser.json());

app.post("/createPost", (req, res) => {
    let topic = req.body.topic;
    let data = req.body.data;
    let sort = req.body.sort;

    let date = new Date();
    let timestamp = date.toISOString().slice(0, 19).replace('T', ' ');
    
    let json = { "topic": topic, "data": data, "timestamp": timestamp };

    posts.insert(json).then((body) => {
        if (sort === "topic-ascend") {
            const indexDef = {
                index: { fields: ["topic"] },
                name: 'topicindex'
            };
            posts.createIndex(indexDef).then((result) => {
                let resultArray = [];
                let query = {
                    "selector": { "topic": { "$gt": null } },
                    "fields": ["topic", "data", "timestamp"],
                    "sort": [{ "topic": "asc" }],
                    "limit": 30,
                    "skip": 0
                }
                posts.find(query).then((body) => {
                    for (let a in body.docs) {
                        let topic = body.docs[a].topic;
                        let data = body.docs[a].data;
                        let timestamp = body.docs[a].timestamp;
                        let post = { "topic": topic, "data": data, "timestamp": timestamp };
                        resultArray.push(post);
                    }
                    res.send(resultArray);
                })
            });
        } else if (sort === "topic-descend") {
            const indexDef = {
                index: { fields: ["topic"] },
                name: 'topicindex'
            };
            posts.createIndex(indexDef).then((result) => {
                let resultArray = [];
                let query = {
                    "selector": { "topic": { "$gt": null } },
                    "fields": ["topic", "data", "timestamp"],
                    "sort": [{ "topic": "desc" }],
                    "limit": 30,
                    "skip": 0
                }
                posts.find(query).then((body) => {
                    for (let a in body.docs) {
                        let topic = body.docs[a].topic;
                        let data = body.docs[a].data;
                        let timestamp = body.docs[a].timestamp;
                        let post = { "topic": topic, "data": data, "timestamp": timestamp };
                        resultArray.push(post);
                    }
                    res.send(resultArray);
                })
            });
        } else if (sort === "time-ascend") {
            const indexDef = {
                index: { fields: ["timestamp"] },
                name: 'timeindex'
            };
            posts.createIndex(indexDef).then((result) => {
                let resultArray = [];
                let query = {
                    "selector": { "timestamp": { "$gt": null } },
                    "fields": ["topic", "data", "timestamp"],
                    "sort": [{ "timestamp": "asc" }],
                    "limit": 30,
                    "skip": 0
                }
                posts.find(query).then((body) => {
                    for (let a in body.docs) {
                        let topic = body.docs[a].topic;
                        let data = body.docs[a].data;
                        let timestamp = body.docs[a].timestamp;
                        let post = { "topic": topic, "data": data, "timestamp": timestamp };
                        resultArray.push(post);
                    }
                    res.send(resultArray);
                })
            });
        } else if (sort === "time-descend") {
            const indexDef = {
                index: { fields: ["timestamp"] },
                name: 'timeindex'
            };
            posts.createIndex(indexDef).then((result) => {
                let resultArray = [];
                let query = {
                    "selector": { "timestamp": { "$gt": null } },
                    "fields": ["topic", "data", "timestamp"],
                    "sort": [{ "timestamp": "desc" }],
                    "limit": 30,
                    "skip": 0
                }
                posts.find(query).then((body) => {
                    for (let a in body.docs) {
                        let topic = body.docs[a].topic;
                        let data = body.docs[a].data;
                        let timestamp = body.docs[a].timestamp;
                        let post = { "topic": topic, "data": data, "timestamp": timestamp };
                        resultArray.push(post);
                    }
                    res.send(resultArray);
                })
            });
        }
    });
});

app.use("/", express.static("."));

app.listen(PORT, HOST, () => {
    console.log("up and running...");
})