const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "User must have a user name"]
    },
    userPassword: {
        type: String,
        required: [true, "User must have a user password"]
    }
})

module.exports = mongoose.model('User', userSchema)