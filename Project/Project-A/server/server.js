'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());

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

    connection.query("USE project;", (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Connected!");
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/src/login.html"));
});

app.post('/auth', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
        connection.query('SELECT * FROM staff WHERE username = ? AND password = ?', [username, password], (err, result) => {
            if (result.length > 0) {
                res.redirect('/staff');
            } else {
                res.redirect("/relogin");
            }
            res.end();
        })
    } else {
        res.send("Please enter Username and Password!");
        res.end();
    }
})

app.post('/registerStaff', (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const phone = req.body.phone;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    let statement = `INSERT INTO staff (fname, lname, phone, email, username, password) VALUES ('${fname}', '${lname}', '${phone}', '${email}', '${username}', '${password}')`;

    connection.query(statement, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log("added!");
            connection.query("SELECT * FROM staff ORDER BY fname ASC;", (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    res.send(JSON.stringify(result));
                }
            })
        }
    })
})

app.post('/deleteStaff', (req, res) => {
    const username = req.body.username;
    let statement = `DELETE FROM staff WHERE username = '${username}';`;
    connection.query(statement, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log("deleted");
            connection.query("SELECT * FROM staff ORDER BY fname ASC;", (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    res.send(JSON.stringify(result));
                }
            })
        }
    })
})

app.post('/registerCustomer', (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const phone = req.body.phone;
    const email = req.body.email;
    const dob = req.body.dob;
    const blood_type = req.body.blood_type;

    let statement = `INSERT INTO customer (fname, lname, phone, email, dob, blood_type) VALUES ('${fname}', '${lname}', '${phone}', '${email}', '${dob}', '${blood_type}')`;

    connection.query(statement, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log("added!");
            connection.query("SELECT * FROM customer ORDER BY fname ASC;", (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    res.send(JSON.stringify(result));
                }
            })
        }
    })
})

app.post("/deleteCustomer", (req, res) => {
    const email = req.body.email;
    let statement = `DELETE FROM customer WHERE email = '${email}';`;
    connection.query(statement, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log("deleted");
            connection.query("SELECT * FROM customer ORDER BY fname ASC;", (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    res.send(JSON.stringify(result));
                }
            })
        }
    })
})

app.get('/staff', (req, res) => {
    res.sendFile(path.join(__dirname + "/src/staff.html"));
})

app.get('/relogin', (req, res) => {
    res.sendFile(path.join(__dirname + "/src/relogin.html"));
})

app.get('/customer', (req, res) => {
    res.sendFile(path.join(__dirname + "/src/customer.html"));
})

app.use(express.static(__dirname));

app.listen(PORT, HOST, () => {
    console.log("up and running...");
})