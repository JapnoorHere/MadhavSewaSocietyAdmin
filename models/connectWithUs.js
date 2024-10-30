const mongoose = require('mongoose');
const connectWithUsSchema = new mongoose.Schema({
    name :{
        type : String,
    },
    email :{
        type : String,
    },
    phone :{
        type : String,
    },
    dateAndTime: {
        type: String,
    },
    uploadDateAndTime:{
        type: String,
        default: () => new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
    },
    invite : {
        type : String
    },  
    place : {
        type :String,
    },
    status :{
        type : String,
        default : '0'
    }
},{collection : "connectWithUs"});

module.exports = mongoose.model('ConnectWithUs',connectWithUsSchema);