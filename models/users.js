const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,

    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
    created : {
        type : String,
        required : true,
        default : new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
    }
},
{
    collection : 'users'
});

module.exports = mongoose.model('User',userSchema)