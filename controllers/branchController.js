// controllers/branchController.js
import { Batch, Branch, Course } from '../models/index.js';

export const branchController = {
  // Create a new branch
  createBranch: async (req, res) => {
    try {
      const { branchName, course } = req.body;

      // Validate input
      if (!branchName || !course) {
        return res.status(400).json({ message: 'Branch name and course are required' });
      }

      // Check if the course exists
      const existingCourse = await Course.findById(course);
      if (!existingCourse) {
        return res.status(404).json({ message: 'Course not found' });
      }

      // Create the branch
      const newBranch = new Branch({ branchName, course });
      await newBranch.save();

      res.status(201).json(newBranch);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all branches
  getAllBranches: async (req, res) => {
    try {
      const branches = await Branch.find().populate('course', 'courseName');
      res.status(200).json(branches);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single branch by ID
  getBranchById: async (req, res) => {
    try {
      const branch = await Branch.findById(req.params.id).populate('course', 'courseName');
      if (!branch) {
        return res.status(404).json({ message: 'Branch not found' });
      }
      res.status(200).json(branch);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a branch
  updateBranch: async (req, res) => {
    try {
      const { branchName, course } = req.body;
      const branch = await Branch.findById(req.params.id);

      if (!branch) {
        return res.status(404).json({ message: 'Branch not found' });
      }

      if (branchName) branch.branchName = branchName;
      
      if (course) {
        const existingCourse = await Course.findById(course);
        if (!existingCourse) {
          return res.status(404).json({ message: 'Course not found' });
        }
        branch.course = course;
      }

      await branch.save();
      res.status(200).json(branch);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a branch
  deleteBranch: async (req, res) => {
    try {
      const branch = await Branch.findByIdAndDelete(req.params.id);

      if (!branch) {
        return res.status(404).json({ message: 'Branch not found' });
      }

      res.status(200).json({ message: 'Branch deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get branches by course
  getBranchesByCourse: async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const branches = await Branch.find({ course: courseId }).populate('course', 'courseName');
      res.status(200).json(branches);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default branchController;




export const getAvailableBranches = async (req, res) => {
    try {
        const { batchId, courseId } = req.params;

        // Find the batch by ID
        const batch = await Batch.findById(batchId)
            .populate('courses.branches.branch', 'branchName');

        if (!batch) {
            return res.status(404).json({ message: 'Batch not found' });
        }

        // Find the specific course within the batch
        const course = batch.courses.find(c => c.course.toString() === courseId);

        if (!course) {
            return res.status(404).json({ message: 'Course not found in this batch' });
        }

        // Extract available branches
        const availableBranches = course.branches.map(branch => ({
            branchId: branch.branch._id,
            branchName: branch.branch.branchName
        }));

        res.status(200).json(availableBranches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
