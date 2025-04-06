const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate'); // Import the Candidate model

// Route to get all candidates and their vote counts
router.get('/voteCounts', async (req, res) => {
    try {
        const candidates = await Candidate.find({}, 'name department voteCount'); // Fetch candidates

        // Log the vote counts for all candidates in the terminal
        console.log('Current Vote Counts:');
        candidates.forEach(candidate => {
            console.log(`Name: ${candidate.name}, Department: ${candidate.department}, Votes: ${candidate.voteCount}`);
        });

        res.status(200).json(candidates); // Send response
    } catch (err) {
        console.error('Error fetching candidates:', err); // Debugging
        res.status(500).json({ error: 'Failed to fetch vote counts' });
    }
});

// Route to increment vote count for a candidate
router.post('/vote/:id', async (req, res) => {
    try {
        const candidateId = req.params.id;

        // Increment the vote count for the candidate
        const updatedCandidate = await Candidate.findByIdAndUpdate(
            candidateId,
            { $inc: { voteCount: 1 } },
            { new: true } // Return the updated document
        );

        if (!updatedCandidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        res.status(200).json({
            message: 'Vote count updated successfully',
            candidate: updatedCandidate
        });
    } catch (error) {
        console.error('Error updating vote count:', error); // Debugging
        res.status(500).json({ error: 'Failed to update vote count' });
    }
});

module.exports = router;