// controllers/courseController.js
import { Batch, Course } from '../models/index.js';

export const courseController = {
  // Create a new course
  createCourse: async (req, res) => {
    try {
      const { courseName } = req.body;
      const newCourse = new Course({ courseName });
      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all courses
  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.find();
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single course by ID
  getCourseById: async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a course
  updateCourse: async (req, res) => {
    try {
      const { courseName } = req.body;
      const course = await Course.findByIdAndUpdate(
        req.params.id,
        { courseName },
        { new: true }
      );
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.status(200).json(course);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a course
  deleteCourse: async (req, res) => {
    try {
      const course = await Course.findByIdAndDelete(req.params.id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default courseController;



export const getAvailableCourses = async (req, res) => {
    try {
        const { batchId } = req.params;

        // Find the batch by ID
        const batch = await Batch.findById(batchId)
            .populate('courses.course', 'courseName');

        if (!batch) {
            return res.status(404).json({ message: 'Batch not found' });
        }

        // Extract available courses
        const availableCourses = batch.courses.map(course => ({
            courseId: course.course._id,
            courseName: course.course.courseName
        }));

        res.status(200).json(availableCourses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
