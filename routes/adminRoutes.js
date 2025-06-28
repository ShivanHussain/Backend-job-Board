import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';
import {
  dashboardStats,
  getAllUsers,
  deleteUser,
  getAllApplications,
  deleteJob,
} from '../controllers/adminController.js';

const router = express.Router();

//Admin Dashboard Stats
router.get('/dashboard', isAuthenticated, isAdmin, dashboardStats);

//Get all users
router.get('/users', isAuthenticated, isAdmin, getAllUsers);

//Delete a user
router.delete('/user/:id', isAuthenticated, isAdmin, deleteUser);

//Get all job applications
router.get('/applications', isAuthenticated, isAdmin, getAllApplications);

//Delete a job
router.delete('/job/:id', isAuthenticated, isAdmin, deleteJob);

export default router;
