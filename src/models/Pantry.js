import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

// Define the Pantry model directly
const Pantry = sequelize.define('Pantry', {
  // pantry_id will be created automatically by Sequelize as primary key
  
  // name field - required string
  name: {
    type: DataTypes.STRING,        // VARCHAR(255) in PostgreSQL
    allowNull: false,              // This field cannot be empty
    validate: {
      notEmpty: true,              // Cannot be just empty spaces
      len: [1, 255]                // Must be between 1 and 255 characters
    }
  },
  
  // description field - optional text
  description: {
    type: DataTypes.TEXT,          // TEXT in PostgreSQL (unlimited length)
    allowNull: true,               // This field can be empty
    validate: {
      len: [0, 1000]               // Optional: limit description length
    }
  },
  
  // created_at and updated_at are added automatically by Sequelize!
}, {
  // Model options
  tableName: 'pantries',           // Explicitly set table name
  timestamps: true,                // Automatically add createdAt and updatedAt
  underscored: true,               // Use snake_case for column names
});

export default Pantry;