'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Staff = require("./models/staff");
const Customer = require("./models/customer");


const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

// connect to mogoDB
const dbURI = 'mongodb+srv://admin:Sunny18@cluster0.yb52a.mongodb.net/project?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(PORT, HOST, () => {
        console.log("up and running...");
    }))
    .catch((err) => console.error(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/auth', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    Staff.findOne({ username: `${username}`, password: `${password}` })
        .then((result) => {
            res.redirect('/staff')
        })
        .catch((err) => {
            res.redirect('/relogin')
        })
})

app.post('/registerStaff', (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const phone = req.body.phone;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    const staff = new Staff({
        fname: `${fname}`,
        lname: `${lname}`,
        phone: `${phone}`,
        email: `${email}`,
        username: `${username}`,
        password: `${password}`
    });

    staff.save()
        .then((result) => {
            Staff.find()
                .then((result) => {
                    res.send(result);
                })
                .catch((err) => {
                    console.error(err);
                })
        })
        .catch((err) => {
            console.error(err)
        })
})

app.post('/deleteStaff', (req, res) => {
    const username = req.body.username;

    Staff.findOneAndDelete({ username: `${username}` }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            Staff.find()
                .then((result) => {
                    res.send(result);
                })
                .catch((err) => {
                    console.error(err);
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

    const customer = new Customer({
        fname: `${fname}`,
        lname: `${lname}`,
        phone: `${phone}`,
        email: `${email}`,
        dob: `${dob}`,
        bloodType: `${blood_type}`
    });

    customer.save()
        .then((result) => {
            Customer.find()
                .then((result) => {
                    res.send(result);
                })
                .catch((err) => {
                    console.error(err);
                })
        })
        .catch((err) => {
            console.error(err);
        })
})

app.post('/deleteCustomer', (req, res) => {
    const email = req.body.email;

    Customer.findOneAndDelete({ email: `${email}` }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            Customer.find()
                .then((result) => {
                    res.send(result);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    })
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/src/login.html"));
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