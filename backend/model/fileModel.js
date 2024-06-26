const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    data: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
    },
    eventId: [{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
})

module.exports = mongoose.model('File', dataSchema)