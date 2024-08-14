// routes/courseRoutes.js
import express from 'express';
import courseController from '../controllers/courseController.js';

const router = express.Router();

router.post('/', courseController.createCourse);
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

export default router;

// Similar route files for sectionRoutes.js and subjectRoutes.js