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
    users: [{
        id: String,
        donation_date_time: {
            type: String,
            default: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        }
    }]
}, { collection: 'donations' });

module.exports = mongoose.model('Donation', donationSchema);
