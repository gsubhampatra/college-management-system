// routes/batchRoutes.js
import express from 'express';
import batchController from '../controllers/batchController.js';

const router = express.Router();

router.post('/', batchController.createBatch);
router.get('/', batchController.getAllBatches);
router.get('/:year', batchController.getBatchByYear);
router.put('/:year', batchController.updateBatch);
router.delete('/:year', batchController.deleteBatch);

export default router;