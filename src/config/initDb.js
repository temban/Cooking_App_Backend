// src/config/initDb.js
import pool from './db.js';

export const initDatabase = async () => {
  try {
    // Create enum type first
    await pool.query(`
      DO $$ 
      BEGIN 
        CREATE TYPE user_role AS ENUM ('client', 'chef');
      EXCEPTION 
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role user_role DEFAULT 'client',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Database tables created successfully');
  } catch (error) {
    console.error('❌ Error creating database tables:', error.message);
    throw error;
  }
};