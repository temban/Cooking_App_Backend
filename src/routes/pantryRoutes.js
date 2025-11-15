import express from 'express';
import { pantryController } from '../controllers/pantryController.js';

// Create a router object to define routes
const router = express.Router();

// Define routes and connect them to controller functions

// GET /api/v1/pantries - Get all pantries
router.get('/', pantryController.getAllPantries);

// GET /api/v1/pantries/:id - Get a specific pantry by ID
router.get('/:id', pantryController.getPantryById);

// POST /api/v1/pantries - Create a new pantry
router.post('/', pantryController.createPantry);

// Export the router to use in server.js
export default router;