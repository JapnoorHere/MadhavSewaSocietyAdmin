require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors')
//middlewares
app.use(cors(
    {
        origin : "*",
        credentials : true
    }
))
app.use(express.urlencoded({extended : true}));
app.use(express.static('views'));
app.use(express.static('images'));
app.use(express.json());
app.use(session({
    secret : "this_is_secret",
    saveUninitialized : false,
    resave : false,
    maxAge : 30 * 24 * 60 * 60 * 1000
}));
app.set('view engine','ejs');
app.use(require('./routes/routes'));
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;

db.on('error',err=>{
    console.log(err);
})

db.once('open',()=>{
    console.log("DB connected");
})

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})
