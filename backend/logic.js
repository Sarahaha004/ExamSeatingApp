const express = require('express');
const mongoose = require('mongoose');
const { Room, Exam, Student } = require('./models'); // Assuming models are defined in a separate file
const app = express();

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/examSeatingDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Seating allocation logic
app.post('/allocateSeats', async (req, res) => {
  const { name, rollNo, email, examId } = req.body;

  try {
    // Fetch exam details and available rooms
    const exam = await Exam.findById(examId).populate('room');
    const room = exam.room;
    const availableSeats = room.capacity - await Student.countDocuments({ exam: examId });

    if (availableSeats > 0) {
      // Allocate seat based on available seats
      const seatNumber = room.capacity - availableSeats + 1; // Assign seats incrementally

      // Create student record with allocated seat
      const student = new Student({ name, rollNo, email, exam: examId, seatNumber });
      await student.save();

      res.status(200).json({ success: true, message: 'Seat allocated successfully', seatNumber, roomNo: room.roomNo });
    } else {
      res.status(400).json({ success: false, message: 'No available seats for this exam' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Seat allocation failed', error: error.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
