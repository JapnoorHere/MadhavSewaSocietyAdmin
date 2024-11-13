const mongoose = require('mongoose');
const donationSchema = new mongoose.Schema({   
    donation_name: {
        type: String
    },
    donation_description: {
        type: String
    },
    donation_fund: {
        type: String
    },
    donation_image_url: {
        type: String
    },
    donation_date_time: {
        type: String,
        default: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
    },
    donors: [{
        id: String,
        date_time: {
            type: String,
            default: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        },
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
    }]
}, { collection: 'donations' });

module.exports = mongoose.model('Donation', donationSchema);
