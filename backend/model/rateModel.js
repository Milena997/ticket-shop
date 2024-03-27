const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    eventId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'

    },
    reviewScore: {
        required: true,
        type: Number,
        min: 1,
        max: 5
    }
})

module.exports = mongoose.model('Rate', dataSchema)