const mongoose = require('mongoose');
const mudrasSchema = new mongoose.Schema({
    name :{
        type : String
    },
    description :{
        type : String
    },
    perform :{
        type : String
    },
    benefits :{
        type : String
    },
    release :{
        type : String
    },
    duration :{
        type : String
    }
});

module.exports = mongoose.model('Mudras', mudrasSchema);