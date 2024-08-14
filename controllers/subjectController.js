// controllers/subjectController.js
import { Subject } from '../models/index.js';

export const subjectController = {
  // Create a new subject
  createSubject: async (req, res) => {
    try {
      const { subjectName, subjectCode } = req.body;
      
      if (!subjectName || !subjectCode) {
        return res.status(400).json({ message: 'Subject name and code are required' });
      }

      const newSubject = new Subject({ subjectName, subjectCode });
      await newSubject.save();
      res.status(201).json(newSubject);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all subjects
  getAllSubjects: async (req, res) => {
    try {
      const subjects = await Subject.find();
      res.status(200).json(subjects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single subject by ID
  getSubjectById: async (req, res) => {
    try {
      const subject = await Subject.findById(req.params.id);
      if (!subject) {
        return res.status(404).json({ message: 'Subject not found' });
      }
      res.status(200).json(subject);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a subject
  updateSubject: async (req, res) => {
    try {
      const { subjectName, subjectCode } = req.body;
      
      const subject = await Subject.findByIdAndUpdate(
        req.params.id,
        { subjectName, subjectCode },
        { new: true }
      );
      
      if (!subject) {
        return res.status(404).json({ message: 'Subject not found' });
      }
      res.status(200).json(subject);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a subject
  deleteSubject: async (req, res) => {
    try {
      const subject = await Subject.findByIdAndDelete(req.params.id);
      if (!subject) {
        return res.status(404).json({ message: 'Subject not found' });
      }
      res.status(200).json({ message: 'Subject deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default subjectController;