const mongoose = require('mongoose');
const Joi = require('joi')


const dataSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
   
})

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(100).required()
    })
    return schema.validate(user)
}


module.exports.validate = validateUser
module.exports = mongoose.model('User', dataSchema)