const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
}, {timestamps: {createdAt: 'createdAt' , updatedAt: "updatedAt" }})

const UserModel = mongoose.model('User',userSchema)
module.exports = UserModel;