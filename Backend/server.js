const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS

const app = express();

// Load environment variables
dotenv.config();

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
});

// Import routes
const voteRoutes = require('./backend/routes/voteRoutes');
const adminRoutes = require('./backend/routes/adminRoutes');

// Define routes
app.use('/vote', voteRoutes); // Route for voting
app.use('/admin', adminRoutes); // Route for admin functionalities

// Test route to check if the server is running
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});