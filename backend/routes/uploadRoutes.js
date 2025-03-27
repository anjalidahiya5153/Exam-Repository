// const express = require('express');
// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('../config/Cloudinary');
// const QuestionPaper = require('../models/QuestionPaper');
// const Tesseract = require('tesseract.js');
// const User = require('../models/User'); // Import User model
// const { createNotification } = require('../controllers/notificationController');
// const { getIoInstance } = require('../sockets/socketHandler');

// const router = express.Router();

// // Multer Storage Setup
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'question_papers',
//     allowed_formats: ['pdf', 'jpg', 'png']
//   }
// });

// const upload = multer({ storage: storage });

// // Upload Route with Notifications
// router.post('/', upload.single('file'), async (req, res) => {
//   try {
//     const { subject, year, department, semester, courseId } = req.body;
    
//     // Extract text using Tesseract
//     const textData = await Tesseract.recognize(req.file.path, 'eng');
//     const extractedText = textData.data.text;

//     // Save metadata in MongoDB
//     const newPaper = new QuestionPaper({
//       filename: req.file.filename,
//       url: req.file.path,
//       subject,
//       year,
//       department,
//       semester,
//       extractedText
//     });

//     await newPaper.save();

//     // Notify users in the same course
//     if (courseId) {
//       const courseUsers = await User.find({ courses: courseId });
//       const io = getIoInstance();
//       courseUsers.forEach(user => {
//         createNotification(user._id, `A new question paper for ${subject} has been uploaded!`, io);
//       });
//     }

//     res.json({ message: 'Upload successful, notifications sent', data: newPaper });
//   } catch (error) {
//     res.status(500).json({ message: 'Upload failed', error });
//   }
// });

// module.exports = router;


const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/Cloudinary');
const QuestionPaper = require('../models/QuestionPaper');
const Tesseract = require('tesseract.js');
const User = require('../models/User'); // Ensure this model exists
const { createNotification } = require('../controllers/notificationController');

const router = express.Router();

// Multer Storage Setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'question_papers',
    allowed_formats: ['pdf', 'jpg', 'png']
  }
});

const upload = multer({ storage: storage });

// Upload Route with Notification Trigger
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { subject, year, department, semester, courseId } = req.body;
    
    // Extract text using Tesseract
    const textData = await Tesseract.recognize(req.file.path, 'eng');
    const extractedText = textData.data.text;

    // Save metadata in MongoDB
    const newPaper = new QuestionPaper({
      filename: req.file.filename,
      url: req.file.path,
      subject,
      year,
      department,
      semester,
      extractedText
    });

    await newPaper.save();

    // Notify users in the same course
    if (courseId) {
      const courseUsers = await User.find({ courses: courseId });
      courseUsers.forEach(user => {
        createNotification(user._id, `A new question paper for ${subject} has been uploaded.`);
      });
    }

    res.json({ message: 'Upload successful, notifications sent.', data: newPaper });

  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error });
  }
});

module.exports = router;
