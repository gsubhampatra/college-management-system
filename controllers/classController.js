// controllers/classController.js
import { Class, Subject, User, Section } from '../models/index.js';

export const classController = {
  // Create a new class
  createClass: async (req, res) => {
    try {
      const { subject, teacher, section } = req.body;
      
      if (!subject || !teacher || !section) {
        return res.status(400).json({ message: 'Subject, teacher, and section are required' });
      }

      const subjectExists = await Subject.findById(subject);
      if (!subjectExists) {
        return res.status(404).json({ message: 'Subject not found' });
      }

      const teacherExists = await User.findById(teacher);
      if (!teacherExists || teacherExists.role !== 'Teacher') {
        return res.status(404).json({ message: 'Teacher not found' });
      }

      const sectionExists = await Section.findById(section);
      if (!sectionExists) {
        return res.status(404).json({ message: 'Section not found' });
      }

      const newClass = new Class({ subject, teacher, section });
      await newClass.save();
      res.status(201).json(newClass);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all classes
  getAllClasses: async (req, res) => {
    try {
      const classes = await Class.find()
        .populate('subject', 'subjectName subjectCode')
        .populate('teacher', 'name')
        .populate('section', 'sectionName');
      res.status(200).json(classes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single class by ID
  getClassById: async (req, res) => {
    try {
      const classItem = await Class.findById(req.params.id)
        .populate('subject', 'subjectName subjectCode')
        .populate('teacher', 'name')
        .populate('section', 'sectionName');
      if (!classItem) {
        return res.status(404).json({ message: 'Class not found' });
      }
      res.status(200).json(classItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a class
  updateClass: async (req, res) => {
    try {
      const { subject, teacher, section } = req.body;
      
      if (subject) {
        const subjectExists = await Subject.findById(subject);
        if (!subjectExists) {
          return res.status(404).json({ message: 'Subject not found' });
        }
      }
      
      if (teacher) {
        const teacherExists = await User.findById(teacher);
        if (!teacherExists || teacherExists.role !== 'Teacher') {
          return res.status(404).json({ message: 'Teacher not found' });
        }
      }
      
      if (section) {
        const sectionExists = await Section.findById(section);
        if (!sectionExists) {
          return res.status(404).json({ message: 'Section not found' });
        }
      }
      
      const classItem = await Class.findByIdAndUpdate(
        req.params.id,
        { subject, teacher, section },
        { new: true }
      )
        .populate('subject', 'subjectName subjectCode')
        .populate('teacher', 'name')
        .populate('section', 'sectionName');
      
      if (!classItem) {
        return res.status(404).json({ message: 'Class not found' });
      }
      res.status(200).json(classItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a class
  deleteClass: async (req, res) => {
    try {
      const classItem = await Class.findByIdAndDelete(req.params.id);
      if (!classItem) {
        return res.status(404).json({ message: 'Class not found' });
      }
      res.status(200).json({ message: 'Class deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default classController;