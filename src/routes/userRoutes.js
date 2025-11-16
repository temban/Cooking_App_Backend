// src/routes/userRoutes.js
import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

// CREATE - POST /api/users
router.post('/users', userController.createUser);

// READ - GET /api/users/:id
router.get('/users/:id', userController.getUser);

// READ - GET /api/users
router.get('/users', userController.getUsers);

// UPDATE - PUT /api/users/:id
router.put('/users/:id', userController.updateUser);

export default router;