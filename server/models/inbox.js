const mongoose = require('mongoose')

const inboxSchema = new mongoose.Schema({
    msg: {
        type: String,
        trim: true,
        required: true
    }
});


const Inbox = mongoose.model('Inbox', inboxSchema)
module.exports = Inbox