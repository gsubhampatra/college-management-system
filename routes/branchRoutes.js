// routes/branchRoutes.js
import express from 'express';
import branchController from '../controllers/branchController.js';

const router = express.Router();

router.post('/', branchController.createBranch);
router.get('/', branchController.getAllBranches);
router.get('/:id', branchController.getBranchById);
router.put('/:id', branchController.updateBranch);
router.delete('/:id', branchController.deleteBranch);
router.get('/course/:courseId', branchController.getBranchesByCourse);

export default router;