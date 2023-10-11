








//index.js

const express = require('express');
const router = express.Router();
const { insertJobData } = require('../insert/insertData');
const mongoose = require('mongoose'); // Import Mongoose
const nodemailer = require('nodemailer'); // Import nodemailer

const Job = mongoose.model('Job'); // Use the existing Job model

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index.hbs', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about.hbs', function (req, res, next) {
  res.render('about', { title: 'Express' });
});

router.get('/conatct.hbs', function (req, res, next) {
  res.render('conatct', { title: 'Express' });
});

router.get('/adminlogin.hbs', function (req, res, next) {
  res.render('adminlogin', { title: 'Express' });
});

// Route to fetch and display job data from the database
// Route to fetch and display job data from the database
router.get('/jobs.hbs', async (req, res, next) => {
  try {
    // Fetch the job data from the database
    const jobs = await Job.find();

    // Render the "jobs" template and pass the job data to it
    res.render('jobs', { title: 'Jobs', job: jobs });
  } catch (error) {
    console.error('Error fetching job data:', error);
    next(error); // Pass the error to Express error handling
  }
});


router.get('/admin.hbs', async (req, res, next) => {
  try {
    // Fetch the job data from the database (you can customize the query)
    const jobs = await Job.find(); // Assuming you want to retrieve all job records

    // Render the 'admin' template and pass the job data to it
    res.render('admin', { title: 'Admin Dashboard', job: jobs });
  } catch (error) {
    console.error('Error fetching job data:', error);
    next(error);
  }
});


router.get('/addjob.hbs', function (req, res, next) {
  res.render('addjob', { title: 'Express' });
});

router.post('/addjob.hbs', (req, res) => {
  const { title, place, time, duration, experience, workhours, description, responsibilities, qualification } = req.body;

  // Log the form data
  console.log(req.body);

  // Call the insertJobData function to insert data into the database
  insertJobData(title, place, time, duration, experience, workhours, description, responsibilities, qualification);

  // Redirect to the admin page
  res.redirect('/admin.hbs');
});

router.post('/admin.hbs', async (req, res) => {
  const { title, place, time, duration, experience, workhours, description, responsibilities, qualification } = req.body;

  // Log the form data
  console.log(req.body);
  const jobs = await Job.find(); // Assuming you want to retrieve all job records

  // Call the insertJobData function to insert data into the database
  insertJobData(title, place, time, duration, experience, workhours, description, responsibilities, qualification);

  // Redirect to a suitable page (e.g., admin dashboard or a confirmation page)
  res.render('admin', { title: 'Admin Dashboard', job: jobs });
});
// Route for displaying the update form for a specific job
router.get('/update.hbs/:id', async (req, res, next) => {
  try {
    // Get the job ID from the request parameters
    const jobId = req.params.id;
    console.log('jobId:', jobId); // Add this line for debugging

    // Fetch the job data by ID from the database (you can customize the query)
    const job = await Job.findById(jobId);
    console.log('job:', job); // Add this line for debugging

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Render the 'update' template and pass the job data to it
    res.render('update', { title: 'Update Job', job });
  } catch (error) {
    console.error('Error rendering update form:', error);
    next(error);
  }
});

/// Route for handling the form submission to update a specific job by ID
router.post('/update.hbs/:id', async (req, res, next) => {
  try {
    // Get the job ID from the request parameters
    const jobId = req.params.id;

    // Get the job data from the request body
    const { title, place, time, duration, experience, workhours, description, responsibilities, qualification } = req.body;

    // Find the job by ID and update its data
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { title, place, time, duration, experience, workhours, description, responsibilities, qualification },
      { new: true } // This option returns the updated job document
    );

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Redirect to a suitable page (e.g., job details or admin dashboard)
    res.redirect('/admin.hbs');
  } catch (error) {
    console.error('Error updating job:', error);
    next(error);
  }
});
router.get('/apply.hbs', (req, res) => {

  res.render('apply', { title: 'apply' });
});
router.get('/ai.hbs', (req, res) => {

  res.render('ai', { title: 'AI/ML AND DATA SCIENCE' });
});
router.get('/webservices.hbs', (req, res) => {

  res.render('webservices', { title: 'webservices' });
});
router.get('/e-commerce.hbs', (req, res) => {

  res.render('e-commerce', { title: 'e-commerce' });
});
router.get('/android.hbs', (req, res) => {

  res.render('android', { title: 'android' });
});
router.get('/cloud.hbs', (req, res) => {

  res.render('cloud', { title: 'cloud' });
});
// Define a route for apply.hbs
// Define a route for applying to a job
router.get('/apply/:id', async (req, res, next) => {
  try {
    // Get the job ID from the request parameters
    const jobId = req.params.id;

    // Retrieve the job details based on the job ID (you might want to fetch it from your database)
    const job = await Job.findById(jobId);

    // Render the apply.hbs template and pass the job object to it
    res.render('apply', { title: 'Apply for Job', job: job });
  } catch (error) {
    console.error('Error handling job application:', error);
    next(error);
  }
});
router.get('/apply.hbs/:id', async (req, res, next) => {
  try {
    // Get the job ID from the request parameters
    const jobId = req.params.id;

    // Retrieve the job details based on the job ID (you might want to fetch it from your database)
    const job = await Job.findById(jobId);

    // Render the apply.hbs template and pass the job object to it
    res.render('apply', { title: 'Apply for Job', job: job });
  } catch (error) {
    console.error('Error handling job application:', error);
    next(error);
  }
});

router.post('/contact.hbs', (req, res) => {
  // Retrieve the form data from the request body
  const { name, email, phone, message } = req.body;

  // You can process the form data as needed here
  // For example, you can store it in a database, log it, or perform other actions

  // Send a response to the client to indicate successful form submission
  // res.status(200).send('Form submitted successfully');
  res.redirect('./conatct.hbs')
});
// Delete a job record
router.delete('/deletejob/:id', async (req, res, next) => {
  try {
    const jobId = req.params.id;

    // Find the job record by ID and delete it
    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    next(error);
  }
});




module.exports = router;

