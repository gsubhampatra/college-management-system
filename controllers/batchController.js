// controllers/batchController.js
import { Batch, Course, Branch, Section } from '../models/index.js';

export const batchController = {
  // Create a new batch
  createBatch: async (req, res) => {
    try {
      const { year, courses } = req.body;

      // Validate year
      if (!year) {
        return res.status(400).json({ message: 'Year is required' });
      }

      // Create the batch
      const newBatch = new Batch({ year, courses: [] });

      // Process courses, branches, and sections
      if (courses) {
        for (const courseData of courses) {
          const course = await Course.findById(courseData.course);
          if (!course) {
            return res.status(404).json({ message: `Course not found: ${courseData.course}` });
          }
  
          const batchCourse = { course: course._id, branches: [] };
  
          for (const branchData of courseData.branches) {
            const branch = await Branch.findById(branchData.branch);
            if (!branch) {
              return res.status(404).json({ message: `Branch not found: ${branchData.branch}` });
            }
  
            const batchBranch = { branch: branch._id, sections: [] };
  
            for (const sectionId of branchData.sections) {
              const section = await Section.findById(sectionId);
              if (!section) {
                return res.status(404).json({ message: `Section not found: ${sectionId}` });
              }
              batchBranch.sections.push(section._id);
            }
  
            batchCourse.branches.push(batchBranch);
          }
  
          newBatch.courses.push(batchCourse);
        }
      }
     

      await newBatch.save();
      res.status(201).json(newBatch);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all batches
  getAllBatches: async (req, res) => {
    try {
      const batches = await Batch.find()
        .populate({
          path: 'courses.course',
          select: 'courseName'
        })
        .populate({
          path: 'courses.branches.branch',
          select: 'branchName'
        })
        .populate({
          path: 'courses.branches.sections',
          select: 'sectionName'
        });
      res.status(200).json(batches);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single batch by year
  getBatchByYear: async (req, res) => {
    try {
      const year = parseInt(req.params.year);
      const batch = await Batch.findOne({ year })
        .populate({
          path: 'courses.course',
          select: 'courseName'
        })
        .populate({
          path: 'courses.branches.branch',
          select: 'branchName'
        })
        .populate({
          path: 'courses.branches.sections',
          select: 'sectionName'
        });

      if (!batch) {
        return res.status(404).json({ message: 'Batch not found' });
      }
      res.status(200).json(batch);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a batch
  updateBatch: async (req, res) => {
    try {
      const { year, courses } = req.body;
      const batch = await Batch.findOne({ year });

      if (!batch) {
        return res.status(404).json({ message: 'Batch not found' });
      }

      batch.courses = [];

      // Process courses, branches, and sections
      for (const courseData of courses) {
        const course = await Course.findById(courseData.course);
        if (!course) {
          return res.status(404).json({ message: `Course not found: ${courseData.course}` });
        }

        const batchCourse = { course: course._id, branches: [] };

        for (const branchData of courseData.branches) {
          const branch = await Branch.findById(branchData.branch);
          if (!branch) {
            return res.status(404).json({ message: `Branch not found: ${branchData.branch}` });
          }

          const batchBranch = { branch: branch._id, sections: [] };

          for (const sectionId of branchData.sections) {
            const section = await Section.findById(sectionId);
            if (!section) {
              return res.status(404).json({ message: `Section not found: ${sectionId}` });
            }
            batchBranch.sections.push(section._id);
          }

          batchCourse.branches.push(batchBranch);
        }

        batch.courses.push(batchCourse);
      }

      await batch.save();
      res.status(200).json(batch);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a batch
  deleteBatch: async (req, res) => {
    try {
      const year = parseInt(req.params.year);
      const batch = await Batch.findOneAndDelete({ year });

      if (!batch) {
        return res.status(404).json({ message: 'Batch not found' });
      }

      res.status(200).json({ message: 'Batch deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default batchController;