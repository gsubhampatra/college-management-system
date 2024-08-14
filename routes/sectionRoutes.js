// routes/courseRoutes.js
import express from 'express';
import sectionController from '../controllers/sectionController.js';

const router = express.Router();

router.post('/', sectionController.createSection);
router.get('/', sectionController.getAllSections);
router.get('/:id', sectionController.getSectionById);
router.put('/:id', sectionController.updateSection);
router.delete('/:id', sectionController.deleteSection);

export default router;