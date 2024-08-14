// controllers/sectionController.js
import { Section, Branch, Batch } from '../models/index.js';

export const sectionController = {
  // Create a new section
  createSection: async (req, res) => {
    try {
      const { sectionName, branch } = req.body;
      const branchExists = await Branch.findById(branch);
      if (!branchExists) {
        return res.status(404).json({ message: 'Branch not found' });
      }
      const newSection = new Section({ sectionName, branch });
      await newSection.save();
      res.status(201).json(newSection);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all sections
  getAllSections: async (req, res) => {
    try {
      const sections = await Section.find().populate('branch', 'branchName');
      res.status(200).json(sections);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single section by ID
  getSectionById: async (req, res) => {
    try {
      const section = await Section.findById(req.params.id).populate('branch', 'branchName');
      if (!section) {
        return res.status(404).json({ message: 'Section not found' });
      }
      res.status(200).json(section);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a section
  updateSection: async (req, res) => {
    try {
      const { sectionName, branch } = req.body;
      if (branch) {
        const branchExists = await Branch.findById(branch);
        if (!branchExists) {
          return res.status(404).json({ message: 'Branch not found' });
        }
      }
      const section = await Section.findByIdAndUpdate(
        req.params.id,
        { sectionName, branch },
        { new: true }
      ).populate('branch', 'branchName');
      if (!section) {
        return res.status(404).json({ message: 'Section not found' });
      }
      res.status(200).json(section);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a section
  deleteSection: async (req, res) => {
    try {
      const section = await Section.findByIdAndDelete(req.params.id);
      if (!section) {
        return res.status(404).json({ message: 'Section not found' });
      }
      res.status(200).json({ message: 'Section deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default sectionController;


export const getAvailableSections = async (req, res) => {
    try {
        const { batchId, courseId, branchId } = req.params;

        // Find the batch by ID
        const batch = await Batch.findById(batchId)
            .populate('courses.branches.sections', 'sectionName');

        if (!batch) {
            return res.status(404).json({ message: 'Batch not found' });
        }

        // Find the specific course within the batch
        const course = batch.courses.find(c => c.course.toString() === courseId);

        if (!course) {
            return res.status(404).json({ message: 'Course not found in this batch' });
        }

        // Find the specific branch within the course
        const branch = course.branches.find(b => b.branch.toString() === branchId);

        if (!branch) {
            return res.status(404).json({ message: 'Branch not found in this course' });
        }

        // Extract available sections
        const availableSections = branch.sections.map(section => ({
            sectionId: section._id,
            sectionName: section.sectionName
        }));

        res.status(200).json(availableSections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
