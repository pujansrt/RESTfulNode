const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const studentSchema = new mongoose.Schema({
    id: String,
    name: {
        type: String,
        trim: true,
        required: 'Please enter a student name'
    },
    email: {
        type: String,
        trim: true,
        required: 'Please enter an Email'
    },
    phone: String,
    gender: String,
    dob: {
        type: Date,
        required: 'Please enter Date of Birth'
    },
    address: String,
    courses: [String],
    created: {
        type: Date,
        default: Date.now
    },
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

module.exports = mongoose.model('Student', studentSchema);
