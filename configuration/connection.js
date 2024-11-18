



const mongoose = require('mongoose');

// Your MongoDB connection URI
const mongoURI = "mongodb+srv://<dbusername>:<dbpassword>@cluster0.xjeefg7.mongodb.net/test";

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
