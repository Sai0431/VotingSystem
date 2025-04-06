const mongoose = require('mongoose');
const Candidate = require('../models/candidate');

exports.castVote = async (req, res) => {
    const { candidateId } = req.body;

    // Debugging logs
    console.log('Request Body:', req.body);
    console.log('Candidate ID:', candidateId);

    // Validate candidateId format
    if (!mongoose.Types.ObjectId.isValid(candidateId)) {
        return res.status(400).json({ error: 'Invalid Candidate ID format' });
    }

    try {
        const candidate = await Candidate.findById(candidateId);
        console.log('Candidate Found:', candidate);

        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        candidate.voteCount += 1;
        await candidate.save();

        console.log('Vote Count Updated:', candidate.voteCount);
        res.status(200).json({ message: 'Vote counted successfully' });
    } catch (err) {
        console.error('Error casting vote:', err);
        res.status(500).json({ error: 'Failed to cast vote' });
    }
};