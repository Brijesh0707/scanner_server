const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
  },
  remarks: {
    type: String
  }
});

module.exports = mongoose.model("Attendance", attendanceSchema);
