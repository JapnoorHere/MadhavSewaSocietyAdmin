const mongoose = require('mongoose');
const differentlyAbleContactFormSchema = new mongoose.Schema({
    name :{
        type : String,
    },
    email :{
        type : String,
    },
    phone :{
        type : String,
    },
    father :{
        type : String,
    },
    mother :{
        type : String,
    },
    gender :{
        type : String,
    },
    qualifications :{
        type : String,
    },
    services :{
        type : String,
    },
    percentage :{
        type : String,
    },
    img_url :{
        type : String,
    },
    dateAndTime: {
        type: String,
        default: () => new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
    },
    status : {
        type :String,
        default : "0"
    }
},{collection : "differentlyAbleContactForms"})

module.exports = mongoose.model('DifferentlyAbleContactForm',differentlyAbleContactFormSchema);