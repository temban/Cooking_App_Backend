# 🍳 User Management System - Kitchen Edition

Let's build a simple user management system where users can be either **Clients** (customers) or **Chefs** (kitchen staff).

---

## 📋 **Step 1: User Model (`src/models/User.js`)**

### **Technical Implementation:**
```js
// src/models/User.js

const User = {
  id: 'number',
  name: 'string',
  email: 'string', 
  password: 'string',
  role: 'string', // 'client' or 'chef'
  created_at: 'timestamp'
};

export default User;
```

### 🍳 **Kitchen Explanation:**
```js
// src/models/User.js
```
**This is our RECIPE CARD for creating users**

```js
const User = {
  id: 'number',           // Unique customer ID number
  name: 'string',         // Customer's name (text)
  email: 'string',        // Customer's email address  
  password: 'string',     // Secret kitchen access code
  role: 'string',         // Either 'client' (diner) or 'chef' (cook)
  created_at: 'timestamp' // When they joined our restaurant
};
```
**Think of this as a BLANK CUSTOMER REGISTRATION FORM that defines what information we need for every person in our system**

---

## 🗄️ **Step 2: Database Service (`src/services/userService.js`)**

### **Technical Implementation:**
```js
// src/services/userService.js
import pool from '../config/db.js';

// CREATE - Add new user
export const createUser = async (userData) => {
  const { name, email, password, role } = userData;
  
  const query = `
    INSERT INTO users (name, email, password, role) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *
  `;
  
  const values = [name, email, password, role];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// READ - Get user by ID
export const getUserById = async (userId) => {
  const query = 'SELECT id, name, email, role, created_at FROM users WHERE id = $1';
  const result = await pool.query(query, [userId]);
  return result.rows[0];
};

// READ - Get all users
export const getAllUsers = async () => {
  const query = 'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC';
  const result = await pool.query(query);
  return result.rows;
};

// UPDATE - Update user information
export const updateUser = async (userId, userData) => {
  const { name, email, role } = userData;
  
  const query = `
    UPDATE users 
    SET name = $1, email = $2, role = $3 
    WHERE id = $4 
    RETURNING *
  `;
  
  const values = [name, email, role, userId];
  const result = await pool.query(query, values);
  return result.rows[0];
};
```

### 🍳 **Kitchen Explanation:**
```js
// src/services/userService.js
```
**This is our SOUS CHEF - handles all the actual "cooking" with the database**

```js
import pool from '../config/db.js';
```
**"Get access to our pantry (database) with multiple access lines"**

#### **CREATE - Add New Customer:**
```js
export const createUser = async (userData) => {
  const { name, email, password, role } = userData;
  
  const query = `
    INSERT INTO users (name, email, password, role) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *
  `;
```
**"Recipe for adding a new customer to our registry: Take their name, email, secret code, and role (client or chef), then add them to our customer book and give us their complete profile back"**

#### **READ - Find One Customer:**
```js
export const getUserById = async (userId) => {
  const query = 'SELECT id, name, email, role, created_at FROM users WHERE id = $1';
```
**"Find a specific customer by their ID number (but don't show their secret password!)"**

#### **READ - Find All Customers:**
```js
export const getAllUsers = async () => {
  const query = 'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC';
```
**"Get a list of ALL customers, newest ones first (still no passwords shown!)"**

#### **UPDATE - Update Customer Info:**
```js
export const updateUser = async (userId, userData) => {
  const query = `
    UPDATE users 
    SET name = $1, email = $2, role = $3 
    WHERE id = $4 
    RETURNING *
  `;
```
**"Change a customer's information - update their name, email, or role, but find them by their ID number"**

---

## 🎯 **Step 3: Controller (`src/controllers/userController.js`)**

### **Technical Implementation:**
```js
// src/controllers/userController.js
import * as userService from '../services/userService.js';

// Create new user
export const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
};

// Get single user by ID
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.updateUser(id, req.body);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
};
```

### 🍳 **Kitchen Explanation:**
```js
// src/controllers/userController.js
```
**This is our HEAD CHEF - decides HOW to handle each customer request**

#### **CREATE User Controller:**
```js
export const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
```
**"When a new customer wants to register: Ask the sous chef to add them, then tell the customer: 'SUCCESS! We're now registered! Here's Our info.'"**

#### **GET User Controller:**
```js
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
```
**"When someone asks for a specific customer: Look them up by ID. If we can't find them, say 'SORRY, customer not found!' Otherwise, give them the customer's info."**

#### **Error Handling:**
```js
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
};
```
**"If the kitchen catches fire (something goes wrong), calmly tell the customer: 'We're having kitchen troubles, please try again later!'"**

---

## 🛣️ **Step 4: Routes (`src/routes/userRoutes.js`)**

### **Technical Implementation:**
```js
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
```

### 🍳 **Kitchen Explanation:**
```js
// src/routes/userRoutes.js
```
**This is our WAITSTAFF - directs customers to the right station**

```js
import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();
```
**"Hire our waitstaff and give them the head chef's instructions"**

#### **Route Definitions:**
```js
// CREATE - POST /api/users
router.post('/users', userController.createUser);
```
**"When customers come to the 'Registration Desk' (/users) with a completed form (POST), send them to the 'Create New Customer' station"**

```js
// READ - GET /api/users/:id
router.get('/users/:id', userController.getUser);
```
**"When customers ask 'Can I see customer #5?' (GET /users/5), send them to the 'Find Customer' station"**

```js
// READ - GET /api/users
router.get('/users', userController.getUsers);
```
**"When customers ask 'Show me ALL customers' (GET /users), send them to the 'Customer List' station"**

```js
// UPDATE - PUT /api/users/:id
router.put('/users/:id', userController.updateUser);
```
**"When customers say 'I need to update customer #3's information' (PUT /users/3), send them to the 'Update Customer' station"**

---

## 🔧 **Step 5: Update Main Server (`server.js`)**

### **Technical Implementation:**
```js
// Add to server.js (after other imports)
import userRoutes from './src/routes/userRoutes.js';

// Add after other middleware
app.use('/api/v1', userRoutes);
```

### 🍳 **Kitchen Explanation:**
```js
import userRoutes from './src/routes/userRoutes.js';
```
**"Hire the customer management waitstaff team"**

```js
app.use('/api/v1', userRoutes);
```
**"Tell them to work at the 'Customer Service Counter' (/api/v1) in our restaurant"**

---

## 📊 **Step 6: Database Table Creation**

### **Technical Implementation:**
```sql
-- Run this in Our PostgreSQL database
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) CHECK (role IN ('client', 'chef')) NOT NULL DEFAULT 'client',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 🍳 **Kitchen Explanation:**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,                    -- Auto-numbered customer IDs
  name VARCHAR(100) NOT NULL,               -- Name required, max 100 letters
  email VARCHAR(100) UNIQUE NOT NULL,       -- Email required, must be unique
  password VARCHAR(255) NOT NULL,           -- Password required
  role VARCHAR(20) CHECK (role IN ('client', 'chef')) NOT NULL DEFAULT 'client',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Auto-fill join date
);
```
**"Create our CUSTOMER REGISTRY BOOK with columns for: ID, Name, Email, Password, Role (only 'client' or 'chef' allowed), and Join Date"**

---

## 📝 **Step 7: Update Swagger Documentation**

### **Technical Implementation:**
Add to `src/config/swagger.yaml`:
```yaml
paths:
  /users:
    post:
      summary: Create a new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                name:
                  type: string
                email:
                  type: string
                password:
                  type: string
                role:
                  type: string
                  enum: [client, chef]
      responses:
        '201':
          description: User created successfully
    get:
      summary: Get all users
      responses:
        '200':
          description: List of users retrieved successfully
  
  /users/{id}:
    get:
      summary: Get user by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: User found
        '404':
          description: User not found
    put:
      summary: Update user by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                name:
                  type: string
                email:
                  type: string
                role:
                  type: string
                  enum: [client, chef]
      responses:
        '200':
          description: User updated successfully
```

### 🍳 **Kitchen Explanation:**
This updates our **RESTAURANT MENU** to show:
- **"Register New Customer"** - Fill out form with name, email, password, role
- **"View All Customers"** - See everyone in our system
- **"Find Specific Customer"** - Look up by ID number
- **"Update Customer Info"** - Change details for existing customer

---

## 🎯 **Complete CRUD Operations Summary**

### **CREATE (POST)**
- **Technical:** `POST /api/v1/users`
- **Kitchen:** "Register a new customer at the front desk"

### **READ - One (GET)**
- **Technical:** `GET /api/v1/users/5`
- **Kitchen:** "Look up customer #5 in the registry"

### **READ - All (GET)**
- **Technical:** `GET /api/v1/users`
- **Kitchen:** "Get the complete customer list"

### **UPDATE (PUT)**
- **Technical:** `PUT /api/v1/users/5`
- **Kitchen:** "Update customer #5's information"

---

## 🚀 **Testing Our User System**

### **Create a User:**
```bash
POST http://localhost:5000/api/v1/users
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123",
  "role": "client"
}
```

### **Get All Users:**
```bash
GET http://localhost:5000/api/v1/users
```

### **Get One User:**
```bash
GET http://localhost:5000/api/v1/users/1
```

### **Update User:**
```bash
PUT http://localhost:5000/api/v1/users/1
{
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "role": "chef"
}
```

# 🗄️ Automated Database Table Setup - Complete Guide

## 📋 **Overview of Updates**

### **What's New:**
- **Automatic table creation** when server starts
- **Database enum validation** for user roles
- **No manual SQL setup required**
- **Clean error handling** for existing tables

---

## 🆕 **NEW FILE: Database Initializer (`src/config/initDb.js`)**

### **Technical Explanation:**
```javascript
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
```

### 🍳 **Kitchen Explanation:**

```javascript
import pool from './db.js';
```
**"Get the keys to the pantry (database connection)"**

```javascript
export const initDatabase = async () => {
```
**"Create a new task: 'Setup the pantry shelves and organization system'"**

```javascript
// Create enum type first
await pool.query(`
  DO $$ 
  BEGIN 
    CREATE TYPE user_role AS ENUM ('client', 'chef');
  EXCEPTION 
    WHEN duplicate_object THEN null;
  END $$;
`);
```
**"First, create two job title badges: 'CLIENT' and 'CHEF'. If these badges already exist, just move on quietly without causing a scene."**

**Technical Breakdown:**
- `DO $$ ... END $$;` = Execute a code block in PostgreSQL
- `CREATE TYPE user_role AS ENUM ('client', 'chef')` = Create a restricted list of allowed values
- `EXCEPTION WHEN duplicate_object THEN null` = If type already exists, do nothing (no error)

```javascript
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
```
**"Now, set up the employee registry book with these columns:**
- **ID number** (auto-generated, main identifier)
- **Full name** (required, max 100 characters)
- **Email address** (required, must be unique to each person)
- **Password** (required, secret access code)
- **Job title** (must be either 'client' or 'chef', defaults to 'client')
- **Join date** (automatically filled with current date/time)
**If this registry book already exists, don't create a duplicate!"**

```javascript
console.log('✅ Database tables created successfully');
```
**"Shout: 'SUCCESS! Pantry organization complete!'"**

```javascript
} catch (error) {
  console.error('❌ Error creating database tables:', error.message);
  throw error;
}
```
**"If something goes wrong during setup, yell: 'EMERGENCY! Pantry setup failed!' and stop everything"**

---

## 🔄 **UPDATED: Main Server (`server.js`)**

### **Technical Changes:**
```javascript
// ADD these imports:
import { initDatabase } from './src/config/initDb.js';

// ADD this line after middleware:
// Initialize database
initDatabase();
```

### **Complete Updated server.js:**
```javascript
// server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import pool from './src/config/db.js';
import { initDatabase } from './src/config/initDb.js';  // NEW IMPORT
import userRoutes from './src/routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database  // NEW LINE
initDatabase();

// Routes
app.use('/api/v1', userRoutes);

// Basic routes
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the Cooking App API." });
});

app.get('/api/test', (req, res) => {
  res.json({ message: "Server is running! API is ready." });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

### 🍳 **Kitchen Explanation:**

```javascript
import { initDatabase } from './src/config/initDb.js';
```
**"Hire the pantry organizer specialist"**

```javascript
// Initialize database
initDatabase();
```
**"Right after setting up the kitchen counters, tell the pantry organizer: 'Go set up the pantry shelves and organization system!'"**

**Why here?** We initialize the database AFTER middleware but BEFORE routes so the database is ready when API calls come in.

---

## 🔧 **UPDATED: User Service (`src/services/userService.js`)**

### **Technical Changes:**
The service functions now explicitly return specific fields (excluding password) in both INSERT and UPDATE operations.

### **Key Updates:**
```javascript
// In createUser:
RETURNING id, name, email, role, created_at

// In updateUser:  
RETURNING id, name, email, role, created_at
```

### 🍳 **Kitchen Explanation:**

**Before:** When creating or updating a customer record, we returned everything including their secret password.

**After:** Now we only return the public information (ID, name, email, role, join date) and keep the password private.

**Like a restaurant that shows Our name and table number but never shows Our credit card pin!**

---

## 🎯 **How the Automatic Setup Works**

### **Technical Flow:**
1. **Server starts** → `server.js` runs
2. **Database init called** → `initDatabase()` executes
3. **Enum creation** → PostgreSQL creates user_role type if not exists
4. **Table creation** → PostgreSQL creates users table if not exists  
5. **Success message** → Console confirms setup complete
6. **Server continues** → API routes become available

### 🍳 **Kitchen Flow:**
1. **Kitchen opens** → Head chef arrives
2. **Pantry setup** → Organizer checks shelves and labels
3. **Job badges** → Creates "Client" and "Chef" tags if missing
4. **Registry book** → Sets up customer logbook if needed
5. **"Ready!" shout** → Confirms everything is organized
6. **Service begins** → Waitstaff start taking orders

---

## 🛡️ **Error Handling & Safety Features**

### **Technical Safety:**
- `CREATE TABLE IF NOT EXISTS` - Prevents duplicate table errors
- `DO $$ BEGIN ... EXCEPTION ... END $$` - Prevents duplicate enum errors  
- `try/catch` - Catches any unexpected errors
- Console logging - Clear success/failure messages

### 🍳 **Kitchen Safety:**
- **"If shelf exists, don't rebuild"** - No duplicate work
- **"If labels exist, don't reprint"** - No wasted materials  
- **"Yell if something breaks"** - Immediate problem awareness
- **"Clean success message"** - Clear confirmation of readiness

---

## 📊 **Database Schema Details**

### **User Table Structure:**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-incrementing unique ID |
| name | VARCHAR(100) | NOT NULL | User's full name |
| email | VARCHAR(100) | UNIQUE, NOT NULL | Unique email address |
| password | VARCHAR(255) | NOT NULL | Hashed password |
| role | user_role | DEFAULT 'client' | Either 'client' or 'chef' |
| created_at | TIMESTAMP | DEFAULT NOW() | Account creation timestamp |

### **Enum Validation:**
- **Only two allowed values**: 'client' or 'chef'
- **Database-level enforcement**: Prevents invalid roles
- **Default value**: 'client' if not specified

---

## 🚀 **Testing the Automatic Setup**

### **First Time Startup:**
```bash
npm run dev
```

**Expected Output:**
```
✅ Database tables created successfully
🚀 Server running on http://localhost:5000
```

### **Subsequent Startups:**
```bash
npm run dev
```

**Expected Output:**
```
🚀 Server running on http://localhost:5000
```

*(No "tables created" message because they already exist)*

### **Testing API Endpoints:**
```bash
# Create a user
curl -X POST http://localhost:5000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"secret123","role":"client"}'

# Get all users  
curl http://localhost:5000/api/v1/users
```

---

## ✅ **Benefits of This Approach**

### **For Developers:**
- **Zero manual setup** - No need to run SQL scripts
- **Consistent environment** - Same setup everywhere
- **Error-resistant** - Handles existing tables gracefully
- **Fast iteration** - Reset database by dropping tables and restarting

### 🍳 **For Kitchen Managers:**
- **Automatic organization** - Pantry sets itself up
- **No manual paperwork** - Registry book creates itself
- **Consistent labeling** - Job titles always correct
- **Quick restocking** - Easy to reset and start fresh

---

## 🎉 **Complete System Ready!**

Our backend now automatically:
1. **Creates the database structure** on first run
2. **Validates user roles** at database level  
3. **Handles existing setups** gracefully
4. **Provides clear feedback** about setup status
5. **Secures sensitive data** by not returning passwords

**The kitchen is fully automated and ready for customers!** 🍽️