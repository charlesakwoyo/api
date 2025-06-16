const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'firstname is required']
    },
    lastname: {
        type: String,
        required: [true, 'lastname is required']
    },
    gender: {
        type: String
    }
});

const Student = mongoose.model('Student', studentSchema); 
module.exports = Student;
