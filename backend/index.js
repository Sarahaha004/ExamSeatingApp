const express = require('express');
const connectDB = require('./db'); // Import MongoDB connection
const { Room, Exam, Student } = require('./models'); // Import your MongoDB models
const { allocateSeats } = require('./logic'); // Import your seating allocation logic

// Create an Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
connectDB();

// Route for seating allocation
app.post('/allocate-seats', async (req, res) => {
  try {
    const { name, rollNo, email, examId } = req.body;
    const result = await allocateSeats(name, rollNo, email, examId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Seat allocation failed', error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3002; // Change 3002 to another available port if needed

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

