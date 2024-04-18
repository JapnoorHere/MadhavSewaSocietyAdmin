const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const User = require('../models/users')
const Volunteer = require('../models/volunteer')


router.get('/',(req,res)=>{
    res.render('index');
})

router.get('/volunteer',(req,res)=>{
        Volunteer.find().then((volunteers)=>{
            res.render('volunteer',{volunteer:volunteers});
        }).catch(err=>{ console.log(err)
    });

})

module.exports = router;