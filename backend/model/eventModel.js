const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    eventName: {
        required: true,
        type: String
    },
    eventDescription: {
        required: false,
        type: String
    },
    eventDate: {
        required: true,
        type: String
    },
    eventLocation: {
        required: true,
        type: String
    },
    eventImage: {
        required: false,
        type: String
    }
})

module.exports = mongoose.model('Event', dataSchema)