const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
    studentCode: {
        type: Number,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    studentPhone: {
        type: String,
        require: true
    },
    fatherPhone: {
        type: String,
        required: true
    },
    motherPhone: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    payment: {
        type: Object,
        required: true
    },
    attendance: {
        type: Array
    },
    attendanceDate: {
        type: Date,
        default: Date.now()
    },
    months: {
        type: Array,
        default: [ ["Jan" ,"Feb" ,"Mar", "Apr"], ["May", "Jun", "Jul", "Aug"], ["Sep" ,"Oct" ,"Nov" ,"Dec"] ]
    },
    exams: {
        type: Array
    }
});

let Student = mongoose.model('Student', studentSchema);
module.exports = Student;