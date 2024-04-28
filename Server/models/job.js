const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    companyName: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    logoUrl: {
        type: String,
        require: true,
    },
    salary: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        require: true,
    },
    duration: {
        type: String,
        require: true,
    },
    locationType: {
        type: String,
        require: true,
    },
    information: {
        type: String,
        require: true,
    },
    jobType: {
        type: String,
        require: true,
    },
    skills: {
        type: Array,
        require: true,
    },
    refUserId: {
        type: mongoose.ObjectId,
    }
}, {timestamps: {createdAt: 'createdAt' , updatedAt: "updatedAt" }})

const JobModel = mongoose.model('Job',jobSchema)
module.exports = JobModel;