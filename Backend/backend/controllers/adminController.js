const Candidate = require('../models/candidate');

exports.getVoteCounts = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json({ voteCounts: candidates });
    } catch (err) {
        console.error('Error fetching vote counts:', err);
        res.status(500).json({ error: 'Failed to fetch vote counts' });
    }
};
