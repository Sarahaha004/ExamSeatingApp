const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define MongoDB schemas/models
const roomSchema = new Schema({
  roomNo: { type: String, required: true },
  capacity: { type: Number, required: true },
});

const examSchema = new Schema({
  date: { type: Date, required: true },
  subjectName: { type: String, required: true },
  subjectCode: { type: String, required: true },
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
});

const studentSchema = new Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true },
  email: { type: String, required: true },
  exam: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
  seatNumber: { type: Number, required: true },
});

const Room = mongoose.model('Room', roomSchema);
const Exam = mongoose.model('Exam', examSchema);
const Student = mongoose.model('Student', studentSchema);

module.exports = { Room, Exam, Student };
