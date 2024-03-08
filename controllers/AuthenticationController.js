const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/StudentModel")

router.post("/register", async (req, res) => {
  try {
    const { fullName, phoneNumber, emailAddress, password } = req.body;
    const existingStudent = await Student.findOne({ emailAddress });
    if (existingStudent) {
      return res.status(400).json({ message: "Email address already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({
      fullName,
      phoneNumber,
      emailAddress,
      password: hashedPassword
    });


    await newStudent.save();

    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {

    const { emailAddress, password } = req.body;


    const student = await Student.findOne({ emailAddress });
    if (!student) {
      return res.status(401).json({ message: "Invalid email address or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email address or password" });
    }

    const token = jwt.sign({ id: student._id }, process.env.SECRECT, {
      expiresIn: "1y" 
    });

    const student2 = await Student.findOne({ emailAddress }).select('-password');


    res.status(200).json({ token ,student2});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
