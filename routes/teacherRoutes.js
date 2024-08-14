// routes/teacherRoutes.js
import express from 'express';
import teacherController from '../controllers/teacherController.js';
import { authenticateUser, authorizeTeacher } from '../middleware/auth.js'; // Assuming you have these middleware

const router = express.Router();

// Apply authentication and teacher authorization middleware to all routes
router.use(authenticateUser, authorizeTeacher);

router.post('/update-attendance', teacherController.updateAttendance);
router.post('/update-marks', teacherController.updateMarks);
router.get('/class-attendance', teacherController.getAttendanceForClass);
router.get('/class-marks', teacherController.getMarksForClass);

export default router;