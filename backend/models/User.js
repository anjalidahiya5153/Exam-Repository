const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  admissionNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  semester: { type: String },
  passingYear: { type: String },
  branch: { type: String },
  currentCourses: { type: [String] },
});

module.exports = mongoose.model("User", userSchema);
