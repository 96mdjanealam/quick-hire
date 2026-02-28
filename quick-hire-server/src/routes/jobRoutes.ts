import express from 'express';
const router = express.Router();
import { getJobs, getJobById, createJob, deleteJob } from '../controllers/jobController.js';
import { validateJob } from '../middleware/validation.js';
import { upload } from '../middleware/upload.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/')
    .get(getJobs)
    .post(protect, admin, upload.single('logo'), validateJob, createJob);

router.route('/:id')
    .get(getJobById)
    .delete(protect, admin, deleteJob);

export default router;
