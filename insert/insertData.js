const mongoose = require('mongoose');

// Define a MongoDB schema and model (replace with your schema)
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

const Job = mongoose.model('Job', jobSchema);

// Function to insert data into the database
async function insertJobData(title, place, time, duration, experience, workhours,  description, responsibilities, qualification) {
  try {
   

    // Create a new job document
    const newJob = new Job({
      title,
      place,
      time,
      duration,
      experience,
      workhours,
      description,
      responsibilities,
      qualification,
    });

    // Save the job document to the database
    await newJob.save();
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
  } 
}

module.exports = { insertJobData };
