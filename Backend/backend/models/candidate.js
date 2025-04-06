const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    image: { type: String },
    borderColor: { type: String },
    info: {
        age: { type: Number },
        level: { type: String },
        cgpa: { type: String },
        position: { type: String },
        achievements: { type: [String] },
        manifesto: { type: String }
    },
    voteCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Candidate', candidateSchema);