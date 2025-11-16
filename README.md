# 🍳 Node.js Backend Setup & Swagger Integration – Kitchen Edition

This document explains backend concepts using kitchen analogies that anyone can understand!

---

## 📦 **1.2 Initialize Node.js - `npm init -y`**

### **Technical Explanation:**
```bash
npm init -y
```
- `npm` = Node Package Manager (tool that manages project dependencies)
- `init` = initialize (create new project structure)
- `-y` = accept all default settings automatically
- Creates `package.json` - the project's configuration file

### 🍳 **Kitchen Explanation:**
```bash
npm init -y
```
This is like **getting Our kitchen building permit and blueprint**! 
- `npm` = Our kitchen construction manager
- `init` = "Start building my kitchen!"
- `-y` = "Use the standard kitchen laWet, I don't need special options"
- `package.json` = Our **kitchen blueprint** that shows:
  - What appliances We'll have (tools needed)
  - How the kitchen should be organized
  - Instructions for cooks (how to start cooking)

---

## 📚 **1.3 Install Required Dependencies**

### **Technical Explanation:**
```bash
npm i express cors dotenv pg swagger-ui-express yamljs
```
- Installs 6 packages that provide specific functionality
- Each package solves a different problem in the backend
- Downloaded to `node_modules` folder (like a toolshed)

### 🍳 **Kitchen Explanation:**
```bash
npm i express cors dotenv pg swagger-ui-express yamljs
```
This is like **ordering all Our major kitchen appliances**:

1. **`express`** = The **kitchen itself** - walls, counters, plumbing
2. **`cors`** = **Security guard** at the kitchen door - controls who can enter
3. **`dotenv`** = **Secret recipe vault** - stores passwords and private ingredients
4. **`pg`** = **Refrigerator & pantry manager** - handles food storage (database)
5. **`swagger-ui-express`** = **Restaurant menu display** - shows customers what We can cook
6. **`yamljs`** = **Menu card printer** - prints beautiful menus in special format



**Development Tool:**
```bash
npm i -D nodemon

npm i -g nodemon
```
- **`nodemon`** = Our **kitchen assistant** who watches We cook and instantly cleans up/restarts when We make a mess

- "-g = global, makes it available everywhere on your system"
---

## 🧱 **1.4 Update package.json**

### **Technical Explanation:**
```json
"type": "module",
"scripts": {
  "dev": "nodemon .",
  "start": "node ."
}
```
- `"type": "module"` enables modern import/export syntax
- `scripts` defines shortcut commands for development and production
- `nodemon .` auto-restarts server during development
- `node .` runs server normally for production

### 🍳 **Kitchen Explanation:**
```json
"type": "module",
"scripts": {
  "dev": "nodemon .",
  "start": "node ."
}
```
This is like **setting up Our kitchen operating modes**:

- **`"type": "module"`** = "We'll use **modern cooking techniques** instead of old-fashioned ones"
- **`"dev": "nodemon ."`** = **"Practice cooking mode"** - Our assistant watches everything and instantly resets when We experiment
- **`"start": "node ."`** = **"Real restaurant service mode"** - no interruptions, just serious cooking

---

## 📂 **1.5 Project Folder Structure**

### **Technical Explanation:**
```
server.js
.env
src/
  config/
  routes/
  controllers/
  services/
  models/
```
- Organized separation of concerns
- Each folder has specific responsibility
- Makes code maintainable and scalable

### 🍳 **Kitchen Explanation:**
Think of Our backend as a **professional restaurant kitchen**:

- **`server.js`** = **Main kitchen entrance** - where customers (requests) enter and meals (responses) leave
- **`.env`** = **Manager's office safe** - stores secret recipes, passwords, and security codes
- **`src/config/`** = **Kitchen manual & settings** - oven temperatures, appliance instructions
- **`src/routes/`** = **Waitstaff** - takes customer orders and brings them to the right station
- **`src/controllers/`** = **Head chefs** - decide HOW to cook each order
- **`src/services/`** = **Sous chefs** - actually handle the cooking process
- **`src/models/`** = **Recipe cards** - define what ingredients each dish needs

**Why this organization?**
- Waitstaff don't cook, chefs don't take orders
- Each person has one job = less confusion
- Easy to find who's responsible for what

---

## 🔐 **1.6 Environment Variables (.env)**

### **Technical Explanation:**
```
PGUSER=Our_username
PGHOST=localhost
PGDATABASE=cooking_app_db
PGPASSWORD=Our_password
PGPORT=5432
PORT=5000
```
- Stores configuration outside of code
- Prevents hardcoding sensitive information
- Different values for development vs production

### 🍳 **Kitchen Explanation:**
```
PGUSER=Our_username        // Which chef can access pantry
PGHOST=localhost           // Pantry is in this building
PGDATABASE=cooking_app_db  // Name of our food storage
PGPASSWORD=Our_password   // Lock combination for pantry
PGPORT=5432               // Which pantry door to use
PORT=5000                 // Which window we serve food from
```

This is Our **kitchen security system**:
- **Never write passwords in recipes** (code) - keep them in the safe (.env file)
- **Different keys for different kitchens** - development kitchen vs real restaurant
- **Easy to change locks** without rebuilding entire kitchen

---

## 🗄️ **1.7 Database Configuration (`src/config/db.js`)**

### **Technical Explanation:**
```js
import pg from 'pg';
import 'dotenv/config';

const pool = new pg.Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

pool.on('connect', () => {
  console.log('PostgreSQL DB pool connected successfully.');
});

export default pool;
```

### 🍳 **Kitchen Explanation:
```js
import pg from 'pg';
```
**"Get the refrigerator instruction manual"**

```js
import 'dotenv/config';
```
**"Unlock the secret vault with pantry access codes"**

```js
const pool = new pg.Pool({
  user: process.env.PGUSER,        // Which chef is allowed
  host: process.env.PGHOST,        // Where the pantry is located  
  database: process.env.PGDATABASE, // Which storage room to use
  password: process.env.PGPASSWORD, // Pantry lock combination
  port: process.env.PGPORT,        // Which pantry door to use
});
```
**"Set up multiple pantry access lines so several chefs can get ingredients simultaneously without waiting"**

**Pool Concept:** Instead of one chef waiting in line for the pantry, we have **multiple access points** so many chefs can work at once!

```js
pool.on('connect', () => {
  console.log('PostgreSQL DB pool connected successfully.');
});
```
**"When pantry access is successful, ring the bell: 'DING! Pantry is open for business!'"**

```js
export default pool;
```
**"Tell the whole kitchen: 'Here's how everyone can access the pantry!'"**

---

## 🚀 **1.8 Main Server File (`server.js`)**

### **Technical Explanation - Part 1 (Imports):**
```js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import db from './src/config/db.js';
```

### 🍳 **Kitchen Explanation - Part 1 (Imports):**
```js
import express from 'express';
```
**"Build the main kitchen structure - walls, counters, cooking stations"**

```js
import cors from 'cors';
```
**"Hire a security guard for the kitchen door"**

```js
import 'dotenv/config';
```
**"Unlock the manager's secret vault"**

```js
import db from './src/config/db.js';
```
**"Connect the kitchen to the pantry (database)"**

---

### **Technical Explanation - Part 2 (Setup):**
```js
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
```

### 🍳 **Kitchen Explanation - Part 2 (Setup):**
```js
const app = express();
```
**"Construction complete! The kitchen is now built and ready"**

```js
const PORT = process.env.PORT || 5000;
```
**"We'll serve food through window #5000, unless the manager says otherwise"**

```js
app.use(cors());
```
**"Security guard, start checking everyone at the door!"**

```js
app.use(express.json());
```
**"Install a translator that understands JSON language (how web browsers talk)"**

---

### **Technical Explanation - Part 3 (Routes):**
```js
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the Cooking App API." });
});

app.get('/api/test', (req, res) => {
  res.json({ message: "Server is running! API is ready." });
});
```

### 🍳 **Kitchen Explanation - Part 3 (Routes):**
```js
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the Cooking App API." });
});
```
**"When customers come to the front door (/) , give them a welcome menu that says 'Welcome to our Restaurant!'"**

```js
app.get('/api/test', (req, res) => {
  res.json({ message: "Server is running! API is ready." });
});
```
**"When customers ask for the 'Kitchen Test Dish' (/api/test), serve them a sample that proves the kitchen is working"**

**How it works:**
- **`req`** = Customer's order ("I want the test dish")
- **`res`** = The meal We serve back ("Here's Our test dish")
- **`res.json()`** = Serve the meal on a JSON-shaped plate

---

### **Technical Explanation - Part 4 (Server Start):**
```js
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

### 🍳 **Kitchen Explanation - Part 4 (Server Start):**
```js
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```
**"Open the kitchen for business at serving window ${PORT} and shout: 'KITCHEN IS NOW OPEN AT WINDOW #5000!'"**

Now the kitchen waits for customers (requests) and serves them meals (responses)!

---

## 📘 **Lesson 2: Swagger Documentation**

### **Technical Explanation:**
```yaml
openapi: 3.0.0
info:
  title: Cooking App Backend API
  description: API for managing Recipes, Pantry, and User Data.
  version: 1.0.0
servers:
  - url: http://localhost:5000/api/v1
paths:
  /test:
    get:
      summary: Basic server status check
      responses:
        '200':
          description: OK
```

### 🍳 **Kitchen Explanation:**
```yaml
openapi: 3.0.0
```
**"We're using the latest restaurant menu standard"**

```yaml
info:
  title: Cooking App Backend API
  description: API for managing Recipes, Pantry, and User Data.
  version: 1.0.0
```
**"Restaurant Name: Cooking App Kitchen. We manage recipes, ingredients, and customers. This is our first menu version."**

```yaml
servers:
  - url: http://localhost:5000/api/v1
```
**"We can find our restaurant at Window #5000, First Floor"**

```yaml
paths:
  /test:
    get:
      summary: Basic server status check
      responses:
        '200':
          description: OK
```
**"On the menu: 'Kitchen Test Plate' - proves our kitchen is working. When We order it, we'll serve: 'Everything is OK!'"**

---

### **Technical Explanation - Swagger Setup:**
```js
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const swaggerPath = path.resolve(process.cwd(), 'src/config/swagger.yaml');
const swaggerDocument = YAML.load(swaggerPath);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
```

### 🍳 **Kitchen Explanation - Swagger Setup:**
```js
import swaggerUI from 'swagger-ui-express';
```
**"Get the digital menu display board"**

```js
import YAML from 'yamljs';
```
**"Get the special menu card printer"**

```js
import path from 'path';
```
**"Get the map to find where we stored our menu designs"**

```js
const swaggerPath = path.resolve(process.cwd(), 'src/config/swagger.yaml');
```
**"Find the exact location of our menu design file in the kitchen office"**

```js
const swaggerDocument = YAML.load(swaggerPath);
```
**"Print our beautiful menu cards using the special printer"**

```js
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
```
**"Hang the digital menu display at the '/api-docs' location where customers can see AND test our dishes"**

---

## 🎉 **Our Kitchen is Now Open!**

### **What We've Built:**
🍳 **A fully functional restaurant kitchen (backend) with:**
- **Kitchen structure** (Express server)
- **Security system** (CORS protection) 
- **Pantry access** (Database connection)
- **Multiple chefs** (Connection pool)
- **Beautiful interactive menu** (Swagger documentation)
- **Organized stations** (Folder structure)

### **Ready for Business:**
Our kitchen can now:
- Welcome customers (handle requests)
- Serve simple dishes (send responses)
- Show its menu (API documentation)
- Connect to storage (database)



