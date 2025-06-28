import { Router } from 'express';
import { createJob, getJobs, applyFilter, getJobById } from '../controllers/jobController.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';

const router = Router();
router.get('/', getJobs);
router.get('/filter', applyFilter);
router.post('/create', isAdmin,isAuthenticated, createJob);
router.get('/:id', isAuthenticated, getJobById);

export default router;
