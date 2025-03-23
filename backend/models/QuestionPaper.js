const mongoose = require('mongoose');

const QuestionPaperSchema = new mongoose.Schema({
  filename: String,
  url: String,  // Cloudinary URL
  subject: String,
  year: String,
  department: String,
  semester: String,
  extractedText: String
});

module.exports = mongoose.model('QuestionPaper', QuestionPaperSchema);
