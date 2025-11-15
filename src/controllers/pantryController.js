import { pantryService } from '../services/pantryService.js';

// Controller functions handle the request/response cycle
// They don't know about the database, only the service layer

export const pantryController = {
  // Handle GET request to get all pantries
  getAllPantries: async (req, res) => {
    try {
      // Call the service to get data from database
      const pantries = await pantryService.getAllPantries();
      
      // Send successful response with the data
      res.status(200).json(pantries);
    } catch (error) {
      // If something goes wrong, send error response
      console.error('Error in pantryController.getAllPantries:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: 'Could not retrieve pantries' 
      });
    }
  },

  // Handle GET request to get a specific pantry by ID
  getPantryById: async (req, res) => {
    try {
      // Extract the ID from the URL parameters
      const pantryId = parseInt(req.params.id);
      
      // Validate the ID
      if (isNaN(pantryId)) {
        return res.status(400).json({ 
          error: 'Invalid pantry ID',
          message: 'Pantry ID must be a number' 
        });
      }

      // Call the service to find the pantry
      const pantry = await pantryService.getPantryById(pantryId);
      
      // If pantry not found, send 404
      if (!pantry) {
        return res.status(404).json({ 
          error: 'Not found',
          message: `Pantry with ID ${pantryId} not found` 
        });
      }

      // Send the found pantry
      res.status(200).json(pantry);
    } catch (error) {
      console.error('Error in pantryController.getPantryById:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: 'Could not retrieve pantry' 
      });
    }
  },

  // Handle POST request to create a new pantry
  createPantry: async (req, res) => {
    try {
      // Extract data from the request body
      const { name, description } = req.body;
      
      // Validate required fields
      if (!name) {
        return res.status(400).json({ 
          error: 'Missing required field',
          message: 'Pantry name is required' 
        });
      }

      // Prepare the data for the service
      const pantryData = {
        name: name.trim(),
        description: description ? description.trim() : null
      };

      // Call the service to create the pantry
      const newPantry = await pantryService.createPantry(pantryData);
      
      // Send success response with the created pantry
      res.status(201).json({
        message: 'Pantry created successfully',
        pantry: newPantry
      });
    } catch (error) {
      console.error('Error in pantryController.createPantry:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: 'Could not create pantry' 
      });
    }
  }
};