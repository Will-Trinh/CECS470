const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   });
   mongoose.connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
   });

// Routes
app.use('/api', require('./routes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});

/*
In this file, we:
- Import necessary dependencies.
- Load environment variables using dotenv.
- Initialize an Express app and configure it with the cors and express.json middleware.
- Connect to the MongoDB database using mongoose.
- Set up a route for the API and import the routes from the routes folder.
- Start the server on the specified port.
*/