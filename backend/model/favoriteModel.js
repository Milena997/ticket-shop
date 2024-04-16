const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    eventIdsList: [{
        required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
})

module.exports = mongoose.model('Favorite', dataSchema)