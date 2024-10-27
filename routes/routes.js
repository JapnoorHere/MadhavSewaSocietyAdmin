const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const expressFileUpload = require('express-fileupload');
const nodemailer = require('nodemailer');
const path = require('path');
const User = require('../models/users')
const Admin = require('../models/admin')
const Volunteer = require('../models/volunteer')
const DailyMotivation = require('../models/dailyMotivation');
const Donations = require('../models/donations')
const Mudras = require('../models/mudras');
const DifferentlyAbleContactForms = require('../models/differentlyAbleContactForm')
const Events = require('../models/events');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");

router.use(bodyParser.json());


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD
    }
});

const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");

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

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Check if user exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Admin not available' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        // console.log(admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Generate JWT
        const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        // localStorage.setItem('token', token);
        // localStorage.setItem('user', JSON.stringify(user));
        res.json({ admin, token, message: 'Login successful!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
});

// Accept volunteer
router.get('/accept-volunteer/:id', (req, res) => {
    const userId = req.params.id;
    Volunteer.findByIdAndUpdate(userId, { status: '1' })
        .then(() => Volunteer.findById(userId))
        .then(volunteer => {
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: volunteer.email,
                subject: 'Volunteer Request Accepted',
                text: 'Congratulations! Your volunteer request has been accepted. Shortly, We will join you in our WhatsApp group for further details.'
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.json({ success: true, message: "Volunteer accepted" });
        })
        .catch(err => res.status(500).json({ error: err }));
});

// Reject volunteer
router.get('/reject-volunteer/:id', (req, res) => {
    const userId = req.params.id;
    Volunteer.findByIdAndUpdate(userId, { status: '-1' })
        .then(() => Volunteer.findById(userId))
        .then(volunteer => {
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: volunteer.email,
                subject: 'Volunteer Request Rejected',
                text: 'Sorry! Your volunteer request has been rejected. Better Luck next time.'
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.json({ success: true, message: "Volunteer rejected" });
        })
        .catch(err => res.status(500).json({ error: err }));
});

// Fetch volunteers based on status
router.get('/volunteer', (req, res) => {
    const status = req.query.status || '0'; // Default to '0' (pending volunteers)
    Volunteer.find({ status })
        .then(volunteers => res.json(volunteers))
        .catch(err => res.status(500).json({ error: "Error fetching volunteer data" }));
})

router.post('/upload-daily-motivation', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    let videoFile = req.files.videoFile;
    let storage = getStorage(firebaseApp);
    let today = new Date();
    let dateStr = today.toISOString().split('T')[0];
    let storageRef = ref(storage, `videos/${dateStr}.mp4`);
  
    let metadata = {
      contentType: 'video/mp4',
    };
  
    let uploadTask = uploadBytesResumable(storageRef, videoFile.data, metadata);
  
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        res.status(500).send(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          DailyMotivation.findOneAndUpdate(
            { videoName: `${dateStr}.mp4` },
            { videoUrl: downloadURL, videoName: `${dateStr}.mp4` },
            { upsert: true, new: true, runValidators: true }
          )
            .then(() => {
              res.json({ message: 'Video uploaded successfully', url: downloadURL });
            })
            .catch((err) => {
              res.status(500).json({ error: err });
            });
        });
      }
    );
  });
  
  // POST request to upload mudra
  router.post('/upload-mudra', (req, res) => {
    if (!req.files || !req.files.mudra_img) {
        return res.status(400).send('No image file was uploaded.');
    }

    // Get the image from the request
    let mudra_img = req.files.mudra_img;
    
    // Initialize Firebase Storage and create a reference
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, `mudras/${Date.now()}_${mudra_img.name}`);

    // Metadata for the file
    const metadata = {
        contentType: mudra_img.mimetype,
    };

    // Upload the image file to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, mudra_img.data, metadata);

    uploadTask.on('state_changed',
        (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
        },
        (error) => {
            console.error('Firebase upload error: ', error);
            res.status(500).send('Error uploading image');
        },
        () => {
            // Get the download URL once the upload is complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                // Save the Mudra info in your database
                console.log('File available at', downloadURL);
                Mudras.create({
                    img_url: downloadURL,  // Store the image URL
                    name: req.body.name,
                    description: req.body.description,
                    perform: req.body.perform,
                    benefits: req.body.benefits,
                    release: req.body.release,
                    duration: req.body.duration,
                })
                .then(() => res.json({ message: 'Mudra uploaded successfully', url: downloadURL }))
                .catch((err) => res.status(500).json({ error: err }));
            });
        }
    );
});


  
  
router.post('/upload-donation', (req, res) => {
    const { donation_name, donation_description, donation_fund } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ error: 'No files were uploaded.' });
    }

    let imageFile = req.files.donation_image;
    let imageExtension = path.extname(imageFile.name);
    let storage = getStorage(firebaseApp);
    let storageRef = ref(storage, 'donations/' + donation_name + imageExtension);

    let metadata = {
        contentType: 'image/' + imageExtension.replace('.', '')
    };

    let uploadTask = uploadBytesResumable(storageRef, imageFile.data, metadata);

    uploadTask.on('state_changed',
        (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        (err) => {
            return res.status(500).json({ error: err.message });
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                let donation = new Donations({
                    donation_name: donation_name,
                    donation_description: donation_description,
                    donation_fund: donation_fund,
                    donation_image_url: downloadURL
                });

                donation.save()
                    .then(() => res.status(200).json({ message: 'Donation added successfully' }))
                    .catch(err => res.status(500).json({ error: err.message }));
            });
        }
    );
});

router.get('/donations/list', (req, res) => {
    Donations.find().then((donations) => {
        res.json({ donations });
    }).catch(err => {
        res.status(500).json({ error: err });
    });
});

router.get('/donations/:name', (req, res) => {
    const donationName = req.params.name;
    console.log(donationName);
    
    Donations.findOne({ donation_name: donationName }).then((donation) => {
        if (donation) {
            // Extract the _id values from each user in the donation's users array
            const userIds = donation.users.map(user => user.id);

            // Use the array of _id values to find matching users
            User.find({ _id: { $in: userIds } }).then((users) => {
                console.log("Users:", users);
                console.log("Donation:", donation);
                const date_and_time = donation.users[users.id].donation_date_time
                // Map users with their submitted date and time
                const usersWithDateTime = users.map(user => ({
                    id: user._id,
                    name: user.name,  // Assuming users have a `name` field
                    donation_date_time: date_and_time,
                    email: user.email,
                    phone: user.phone,
                    
                    // Replace with actual field name
                    // Add any other user fields you want here
                }));

                // Respond with donation details and users including their submitted date and time
                res.json({ 
                    users: usersWithDateTime, 
                    donationDetails: {
                        name: donation.donation_name,
                        description: donation.donation_description,
                        fund: donation.donation_fund,
                        imageUrl: donation.donation_image_url,
                        dateTime: donation.donation_date_time
                    }
                });
            }).catch(err => {
                res.status(500).json({ error: err.message });
            });
        } else {
            res.status(404).json({ message: 'Donation not found' });
        }
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});



router.get('/deleteDonation/:id', (req, res) => {
    const donationId = req.params.id;
    Donations.findByIdAndDelete(donationId).then(() => {
        res.json({ message: 'Donation deleted successfully' });
    }).catch(err => {
        res.status(500).json({ error: err });
    });
});




// router.post('/upload-mudra', (req, res) => {
//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('No files were uploaded.');
//     }
//     const { name, description, perform, benefits, release, duration } = req.body;

//     let imgFile = req.files.mudra_img;

//     let imageExtension = path.extname(imgFile.name);
//     let storage = getStorage(firebaseApp);
//     let storageRef = ref(storage, 'mudras/' + name + imageExtension);

//     let metadata = {
//         contentType: "image/" + imageExtension.replace('.', '')
//     }

//     let uploadTask = uploadBytesResumable(storageRef, imgFile.data, metadata);

//     uploadTask.on('state_changed',
//         (snapshot) => {
//             var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log('Upload is ' + progress + '% done');
//         },
//         (err) => {
//             res.status(500).send(err);
//         },
//         () => {
//             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                 console.log('File available at', downloadURL);
//                 var mudra = new Mudras({
//                     name: name,
//                     description: description,
//                     perform: perform,
//                     benefits: benefits,
//                     release: release,
//                     duration: duration,
//                     img_url: downloadURL
//                 });
//                 mudra.save().then(() => {
//                     res.redirect('/dailyMotivation');
//                 }).catch(err => {
//                     res.json({ error: err });
//                 });
//             });
//         });


// });
// backend/routes/differentlyAbleContactForm.js

router.get('/differentlyAbleContactForm', (req, res) => {
    DifferentlyAbleContactForms.find()
      .then((contacts) => {
          res.status(200).json({ contacts: contacts.reverse() });
      })
      .catch(err => {
          res.status(500).json({ error: err });
      });
});

// Accept a contact form by ID and update the status
router.get('/differentlyAbleContactForm/accept/:id', (req, res) => {
    const contactId = req.params.id;
    DifferentlyAbleContactForms.findByIdAndUpdate(contactId, { status: '1' }, { new: true })
      .then((updatedContact) => {
          if (updatedContact) {
              // Send email to the user upon acceptance
              var mailOptions = {
                  from: process.env.SENDER_EMAIL,
                  to: updatedContact.email,
                  subject: 'Request Accepted',
                  text: 'Congratulations! Your Differently Abled Contact form request has been accepted. We will contact you shortly.'
              };
              transporter.sendMail(mailOptions);

              res.status(200).json({ message: 'Contact accepted', contact: updatedContact });
          } else {
              res.status(404).json({ error: 'Contact not found' });
          }
      })
      .catch(err => {
          res.status(500).json({ error: err });
      });
});

// Reject a contact form by ID and update the status
router.get('/differentlyAbleContactForm/reject/:id', (req, res) => {
    const contactId = req.params.id;
    DifferentlyAbleContactForms.findByIdAndUpdate(contactId, { status: '-1' }, { new: true })
      .then((updatedContact) => {
          if (updatedContact) {
              // Send email to the user upon rejection
              var mailOptions = {
                  from: process.env.SENDER_EMAIL,
                  to: updatedContact.email,
                  subject: 'Request Rejected',
                  text: 'Sorry! Your request has been rejected because of some reasons.'
              };
              transporter.sendMail(mailOptions);

              res.status(200).json({ message: 'Contact rejected', contact: updatedContact });
          } else {
              res.status(404).json({ error: 'Contact not found' });
          }
      })
      .catch(err => {
          res.status(500).json({ error: err });
      });
});


router.get('/differentlyAbleContactForm', (req, res) => {
    DifferentlyAbleContactForms.find().then((contacts) => {
        res.render('differentlyAbleContact', { contacts: contacts.reverse(), status: '0' });
    }).catch(err => {
        res.json({ error: err });
    });
})
router.post('/upload-event', (req, res) => {
    if (!req.files || !req.files.event_img) {
        return res.status(400).send('No image file was uploaded.');
    }

    // Get the event image from the request
    let event_img = req.files.event_img;

    // Initialize Firebase Storage and create a reference
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, `events/${Date.now()}_${event_img.name}`);

    // Metadata for the file
    const metadata = {
        contentType: event_img.mimetype,
    };

    // Upload the image file to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, event_img.data, metadata);

    uploadTask.on(
        'state_changed',
        (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
        },
        (error) => {
            console.error('Firebase upload error: ', error);
            res.status(500).send('Error uploading event image');
        },
        () => {
            // Get the download URL once the upload is complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                // Save the event info in the database
                Events.create({
                    img_url: downloadURL,  // Store the image URL
                    date: req.body.date,
                    description: req.body.description,
                })
                .then(() => res.json({ message: 'Event uploaded successfully', url: downloadURL }))
                .catch((err) => res.status(500).json({ error: err }));
            });
        }
    );
});




module.exports = router;
