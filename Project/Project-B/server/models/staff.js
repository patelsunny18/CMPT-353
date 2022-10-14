const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 15
    }
});

const Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;