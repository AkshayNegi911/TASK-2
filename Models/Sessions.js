const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    // sessionId: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
    // userId: {
    //     type: String,
    //     required: true,
    // },
    // expirationDate: {
    //     type: Date,
    //     required: true,
    // },
    // Add other fields as needed
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
