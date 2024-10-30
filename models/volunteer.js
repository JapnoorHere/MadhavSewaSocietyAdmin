const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    dateOfBirth: {
        type: String,
    },
    qualification: {
        type: String,
    },
    field: {
        type: String,
    },
    status : {
        type : String
    }
},
{
    collection: 'volunteers'
});

module.exports = mongoose.model('Volunteer',volunteerSchema)
