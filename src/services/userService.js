// src/services/userService.js
import pool from '../config/db.js';

export const createUser = async (userData) => {
  const { name, email, password, role } = userData;
  
  const query = `
    INSERT INTO users (name, email, password, role) 
    VALUES ($1, $2, $3, $4) 
    RETURNING id, name, email, role, created_at
  `;
  
  const values = [name, email, password, role];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getUserById = async (userId) => {
  const query = 'SELECT id, name, email, role, created_at FROM users WHERE id = $1';
  const result = await pool.query(query, [userId]);
  return result.rows[0];
};

export const getAllUsers = async () => {
  const query = 'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC';
  const result = await pool.query(query);
  return result.rows;
};

export const updateUser = async (userId, userData) => {
  const { name, email, role } = userData;
  
  const query = `
    UPDATE users 
    SET name = $1, email = $2, role = $3 
    WHERE id = $4 
    RETURNING id, name, email, role, created_at
  `;
  
  const values = [name, email, role, userId];
  const result = await pool.query(query, values);
  return result.rows[0];
};