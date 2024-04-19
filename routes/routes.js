const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const expressFileUpload = require('express-fileupload');
const path = require('path');
const User = require('../models/users')
const Volunteer = require('../models/volunteer')
const DailyMotivation = require('../models/dailyMotivation');

const { initializeApp } = require("firebase/app");
const {getStorage, ref, getDownloadURL,uploadBytesResumable} = require("firebase/storage");

router.use(expressFileUpload());

const firebaseConfig = {
  apiKey: "AIzaSyBn798z5IVXx6lV7V_rKfrj3Pbj30O_gaU",
  authDomain: "madhavsewasociety-31fb8.firebaseapp.com",
  projectId: "madhavsewasociety-31fb8",
  storageBucket: "madhavsewasociety-31fb8.appspot.com",
  messagingSenderId: "588888204355",
  appId: "1:588888204355:web:c51aba510f00591b5f20f6",
  measurementId: "G-SCEKMEZ3NL"
};

const firebaseApp = initializeApp(firebaseConfig);





router.get('/', (req, res) => {
    res.render('index');
})


router.get('/accept-volunteer/:id', (req, res) => {
    const userId = req.params.id
    Volunteer.findByIdAndUpdate(userId, { status: '1' }).then(() => {
        res.redirect('/volunteer');
    }).catch(err => {
        req.json({error : err});
    });
});

router.get('/reject-volunteer/:id', (req, res) => {
    const userId = req.params.id
    Volunteer.findByIdAndUpdate(userId, { status: '-1' }).then(() => {
        res.redirect('/volunteer');
    }).catch(err => {
        req.json({error : err});
    });
});


function insertLineBreaks(text) {
    let result = '';
    let charCount = 0;
    for (const char of text) {
        result += char;
        charCount++;
        if (charCount % 50 === 0) {
            result += '<br>';
        }
    }
    return result;
}

router.get('/volunteer/accepted', (req, res) => {
    Volunteer.find().then((volunteers) => {
        res.render('volunteer', { volunteer: volunteers, insertLineBreaks: insertLineBreaks,status: '1' });
    }).catch(err => {
        console.log(err)
    });
});

router.get('/volunteer/rejected', (req, res) => {
    Volunteer.find().then((volunteers) => {
        res.render('volunteer', { volunteer: volunteers, insertLineBreaks: insertLineBreaks,status: '-1' });
    }).catch(err => {
        console.log(err)
    });
});

router.get('/volunteer', (req, res) => {
    
    Volunteer.find().then((volunteers) => {
        res.render('volunteer', { volunteer: volunteers, insertLineBreaks: insertLineBreaks,status: '0' });
    }).catch(err => {
        console.log(err)
    });

})



router.get('/dailyMotivation',(req,res)=>{
    res.render('dailyMotivation');
})

router.post('/upload-daily-motivation', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let videoFile = req.files.videoFile;

    let storage = getStorage(firebaseApp);
    let today = new Date();
    let dateStr = today.toISOString().split('T')[0];
    console.log(dateStr);
    let storageRef = ref(storage, 'videos/' + dateStr + '.mp4');

    let metadata = {
        contentType: 'video/mp4',
    };

    let uploadTask = uploadBytesResumable(storageRef, videoFile.data, metadata);

    uploadTask.on('state_changed',
        (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        (error) => {
            res.status(500).send(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                DailyMotivation.findOneAndUpdate(
                    { videoName: dateStr + '.mp4' },  // filter
                    { videoUrl: downloadURL, videoName: dateStr + '.mp4' },  
                    { upsert: true, new: true, runValidators: true } 
                ).then(() => {
                    res.redirect('/dailyMotivation');
                }).catch(err => {
                    res.json({ error: err });
                });
            });
        }
    );
});

module.exports = router;