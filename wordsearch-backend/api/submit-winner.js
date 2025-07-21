// api/submit-winner.js (for Vercel Serverless Function)
// This file will be placed inside an 'api' directory in your Vercel project.

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // For loading environment variables from .env file

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS configuration
// IMPORTANT: Replace '*' with your actual frontend domain(s) in production for security!
app.use(cors({
    origin:  ['*', 'null'], // Allows all origins for development. Be specific in production.
    methods: ['POST'],
    allowedHeaders: ['Content-Type'],
}));

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error('MONGO_URI is not defined in environment variables.');
    // Exit process or handle error appropriately in a real application
} else {
    mongoose.connect(mongoURI)
        .then(() => console.log('MongoDB connected successfully'))
        .catch(err => console.error('MongoDB connection error:', err));
}

// Define Schema for Winner Data
const winnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    wordsFound: { type: Number, required: true },
    puzzleVersion: { type: Number, required: false }, // Store the puzzle version index
    timestamp: { type: Date, default: Date.now }
});

const Winner = mongoose.models.Winner || mongoose.model('Winner', winnerSchema);

// API Endpoint to submit winner details
app.post('/api/submit-winner', async (req, res) => {
    try {
        const { name, email, wordsFound, puzzleVersion } = req.body;

        // Basic server-side validation
        if (!name || !email || typeof wordsFound !== 'number' || wordsFound < 0) {
            return res.status(400).json({ message: 'Invalid data provided. Name, email, and wordsFound are required.' });
        }

        // Create a new winner document
        const newWinner = new Winner({
            name,
            email,
            wordsFound,
            puzzleVersion,
            timestamp: new Date() // Ensure timestamp is generated on server
        });

        await newWinner.save(); // Save to MongoDB

        res.status(201).json({ message: 'Winner details saved successfully!', winner: newWinner });

    } catch (error) {
        console.error('Error saving winner details:', error);
        res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
});
// NEW API Endpoint to get all winner details (GET route)
app.get('/api/get-winners', async (req, res) => {
    try {
        // Fetch all winners, sort by timestamp descending (most recent first)
        const winners = await Winner.find().sort({ timestamp: -1 });
        res.status(200).json(winners);
    } catch (error) {
        console.error('Error fetching winner details:', error);
        res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
});
// For Vercel, you export the app
module.exports = app;

// If you want to run locally for testing (optional, not needed for Vercel deployment)
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

