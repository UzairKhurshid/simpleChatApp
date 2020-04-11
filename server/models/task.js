const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }
});


const Task = mongoose.model('Task', taskSchema)
module.exports = Task