const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/Cloudinary');
const QuestionPaper = require('../models/QuestionPaper');
const Tesseract = require('tesseract.js');

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

// Upload Route
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { subject, year, department, semester } = req.body;
    
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
    res.json({ message: 'Upload successful', data: newPaper });

  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error });
  }
});

module.exports = router;
