const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: String
    },
    eventId: {
        required: true,
        type: String
    },
    reviewScore: {
        required: true,
        type: Number,
        min: 1,
        max: 5
    }
})

module.exports = mongoose.model('Rate', dataSchema)