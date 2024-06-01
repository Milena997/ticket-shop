const mongoose = require('mongoose');


const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    dateOfBirth: {
        required: true,
        type: String
    },
    location: {
        required: true,
        type: String
    },
    accountId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'

    },
   
})

module.exports = mongoose.model('User', dataSchema)