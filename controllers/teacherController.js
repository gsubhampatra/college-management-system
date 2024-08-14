// controllers/teacherController.js
import { User, Class, Attendance, Marks } from '../models/index.js';

export const teacherController = {
  // Update attendance for a student
  updateAttendance: async (req, res) => {
    try {
      const { studentId, classId, date, status } = req.body;
      const teacherId = req.user._id; // Assuming you have middleware to set the authenticated user

      // Verify the teacher is assigned to the class
      const classItem = await Class.findOne({ _id: classId, teacher: teacherId });
      if (!classItem) {
        return res.status(403).json({ message: 'You are not authorized to update attendance for this class' });
      }

      // Verify the student exists and is a student
      const student = await User.findOne({ _id: studentId, role: 'Student' });
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      // Find existing attendance record or create a new one
      let attendance = await Attendance.findOne({ student: studentId, class: classId, date });
      if (attendance) {
        attendance.status = status;
      } else {
        attendance = new Attendance({ student: studentId, class: classId, date, status });
      }

      await attendance.save();
      res.status(200).json({ message: 'Attendance updated successfully', attendance });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update marks for a student
  updateMarks: async (req, res) => {
    try {
      const { studentId, classId, marks } = req.body;
      const teacherId = req.user._id; // Assuming you have middleware to set the authenticated user

      // Verify the teacher is assigned to the class
      const classItem = await Class.findOne({ _id: classId, teacher: teacherId });
      if (!classItem) {
        return res.status(403).json({ message: 'You are not authorized to update marks for this class' });
      }

      // Verify the student exists and is a student
      const student = await User.findOne({ _id: studentId, role: 'Student' });
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      // Find existing marks record or create a new one
      let marksRecord = await Marks.findOne({ student: studentId, class: classId });
      if (marksRecord) {
        marksRecord.marks = marks;
      } else {
        marksRecord = new Marks({ student: studentId, class: classId, marks });
      }

      await marksRecord.save();
      res.status(200).json({ message: 'Marks updated successfully', marksRecord });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get attendance for a class
  getAttendanceForClass: async (req, res) => {
    try {
      const { classId, date } = req.query;
      const teacherId = req.user._id;

      // Verify the teacher is assigned to the class
      const classItem = await Class.findOne({ _id: classId, teacher: teacherId });
      if (!classItem) {
        return res.status(403).json({ message: 'You are not authorized to view attendance for this class' });
      }

      const attendance = await Attendance.find({ class: classId, date })
        .populate('student', 'name userid')
        .select('student status');

      res.status(200).json(attendance);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get marks for a class
  getMarksForClass: async (req, res) => {
    try {
      const { classId } = req.query;
      const teacherId = req.user._id;

      // Verify the teacher is assigned to the class
      const classItem = await Class.findOne({ _id: classId, teacher: teacherId });
      if (!classItem) {
        return res.status(403).json({ message: 'You are not authorized to view marks for this class' });
      }

      const marks = await Marks.find({ class: classId })
        .populate('student', 'name userid')
        .select('student marks');

      res.status(200).json(marks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default teacherController;