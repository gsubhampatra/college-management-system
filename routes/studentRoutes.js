// routes/studentRoutes.js
import express from 'express';
import { getStudentAttendanceBySubject } from '../controllers/studentController.js';
import { getStudentMarksBySubject } from '../controllers/studentController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateUser);

// Route to get attendance for each subject of a student
router.get('/:userId/attendance', getStudentAttendanceBySubject);
router.get('/:userId/marks', getStudentMarksBySubject);

export default router;
