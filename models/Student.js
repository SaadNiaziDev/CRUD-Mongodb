const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
    age : Number,
    name: String,
    rollNumber: String,
    section:String,
    session:String,
    school:String,
});

const student = mongoose.model('student',studentSchema);


module.exports = student;