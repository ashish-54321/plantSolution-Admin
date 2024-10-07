require('dotenv').config();

// Import required modules
const express = require('express');
const cors = require('cors'); // To handle cross-origin requests
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // For MongoDB connection

// Initialize Express app
const app = express();
const key = process.env.key
// Use middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse incoming JSON data

// Connect to MongoDB Atlas
const mongoURI = `mongodb+srv://ashish_dataBase:${key}@myapp.3hwdvc6.mongodb.net/?retryWrites=true&w=majority&appName=MyApp`; // Replace with your MongoDB Atlas URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Define a Mongoose schema for the plant data
const plantSchema = new mongoose.Schema({
    plantName: String,
    scientificName: String,
    waterSchedule: {
        monday: String,
        tuesday: String,
        wednesday: String,
        thursday: String,
        friday: String,
        saturday: String,
        sunday: String
    },
    sunlightSchedule: {
        monday: String,
        tuesday: String,
        wednesday: String,
        thursday: String,
        friday: String,
        saturday: String,
        sunday: String
    }
});

// Create a Mongoose model
const Plant = mongoose.model('Plant', plantSchema);

// POST endpoint to receive plant data and save it to MongoDB
app.post('/api/plants', async (req, res) => {
    const { plantName, scientificName, waterSchedule, sunlightSchedule } = req.body;

    // Create a new plant instance
    const newPlant = new Plant({
        plantName,
        scientificName,
        waterSchedule,
        sunlightSchedule
    });

    try {
        // Save the plant data to MongoDB
        await newPlant.save();
        res.status(200).json({ message: 'Data saved successfully to MongoDB' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving data to MongoDB', error });
    }
});

// Start the server on port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
