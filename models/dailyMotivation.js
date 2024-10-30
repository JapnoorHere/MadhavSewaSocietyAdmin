const mongoose = require('mongoose');
const dailyMotivationSchema = new mongoose.Schema({
    videoUrl :{
        type : String
    },
    videoName :{
        type : String
    },
    date : {
        type : String,
        default : new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })    
    }
});

module.exports = mongoose.model('DailyMotivation',dailyMotivationSchema);