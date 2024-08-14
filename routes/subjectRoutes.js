// routes/courseRoutes.js
import express from 'express';
import subjectController from '../controllers/subjectController.js';

const router = express.Router();

router.post('/', subjectController.createSubject);
router.get('/', subjectController.getAllSubjects);
router.get('/:id', subjectController.getSubjectById);
router.put('/:id', subjectController.updateSubject);
router.delete('/:id', subjectController.deleteSubject);

export default router;