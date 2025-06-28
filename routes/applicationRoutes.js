import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import Application from '../models/application.js';
import { createApplication, getMyApplications } from '../controllers/applicationController.js';

const router = express.Router();

router.post('/', isAuthenticated, createApplication);

router.get('/my', isAuthenticated, getMyApplications);

export default router;
