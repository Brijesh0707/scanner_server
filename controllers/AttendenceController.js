const express = require("express");
const router = express.Router();
const Attendance = require("../models/AttendenceModel")
const Student  = require("../models/StudentModel");

router.post("/attendance", async (req, res) => {
  try {
    const { studentId, status, remarks } = req.body;
    const attendance = new Attendance({
      student: studentId,
      status: status,
      remarks: remarks
    });
    await attendance.save();

    res.status(201).json({ message: "Attendance recorded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/userdata/:id",async(req,res)=>{
    const {id} = req.params
    try{
        const StudentDetail = await Student.findOne({_id:id}).select('-password')
        if(!StudentDetail){
            return res.status(400).json({message:"user not found"})
        }

        return res.status(200).json(StudentDetail)
 
    }catch(err){ res.status(500).json({ message: "Internal server error" });}
})

router.get("/userdata/qr/:email",async(req,res)=>{
    const {email} = req.params
    try{
        const StudentDetail = await Student.findOne({emailAddress:email}).select('-password')
        if(!StudentDetail){
            return res.status(400).json({message:"user not found"})
        }
        return res.status(200).json(StudentDetail)
 
    }catch(err){ res.status(500).json({ message: "Internal server error" });}
})

router.get("/attendance/:date/:subject", async (req, res) => {
  try {
    const { date, subject } = req.params;

    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(startDate.getDate() + 1);
    const filteredAttendance = await Attendance.find({
      date: { $gte: startDate, $lt: endDate },
      remarks: subject
    }).populate('student');

    res.status(200).json(filteredAttendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
