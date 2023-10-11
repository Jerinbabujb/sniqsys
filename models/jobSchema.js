const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  place: String,
  time: String,
  duration: String,
  experience: String,
  workhours: String,
  description: String,
  responsibilities: String,
  qualification: String,
});

module.exports = mongoose.model('Job', jobSchema);
