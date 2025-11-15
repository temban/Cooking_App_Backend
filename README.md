# Node.js Backend Setup & Swagger Integration – Teaching Guide

This document is designed as a teaching resource for beginners learning how to build a Node.js backend using Express, PostgreSQL, and Swagger (OpenAPI). It contains both **theory** and **practical steps**, explained in the simplest possible terms.

---

# 📘 Lesson 1: Project Setup & File Structure

Before writing any code, we need to properly structure the backend project. A clear structure helps beginners understand where each piece of logic belongs.

## 🎯 Goal of Lesson 1

* Understand project folders and why each exists.
* Initialize a Node.js project.
* Install required backend packages.
* Create a clean folder structure.
* Set up environment variables.
* Create the database connection file.
* Create the main server start file.

---

# 🏗️ 1.1 Create the Backend Folder

Create a new folder anywhere on your computer.

Example: `Cooking_App_Backend/`

Open this folder in VS Code.

---

# 📦 1.2 Initialize Node.js

In VS Code terminal:

```
npm init -y
```

This creates `package.json`.

---

# 📚 1.3 Install Required Dependencies

Run:

```
npm i express cors dotenv pg swagger-ui-express yamljs
```

Install **nodemon** for auto-restart (development only):

```
npm i -D nodemon
```

---

# 🧱 1.4 Update package.json

Inside `package.json`, add:

```
"type": "module",
"scripts": {
  "dev": "nodemon .",
  "start": "node ."
}
```

**Why?**

* `type: module` allows you to use modern `import` syntax.
* `nodemon` restarts the server automatically.

---

# 📂 1.5 Create the Project Folder Structure

Inside the main folder, create:

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

**Why this structure?**

* `server.js`: Starts the server.
* `config/`: Database connection + swagger config.
* `routes/`: API endpoints.
* `controllers/`: Logic for handling requests.
* `services/`: Database queries.
* `models/`: Data structure definitions.

---

# 🔐 1.6 Create Environment Variables (.env)

Create an `.env` file:

```
PGUSER=your_username
PGHOST=localhost
PGDATABASE=cooking_app_db
PGPASSWORD=your_password
PGPORT=5432

PORT=5000
```

**Why?**
We never hardcode passwords in code.

---

# 🗄️ 1.7 Create Database Configuration File

Create a file:

```
src/config/db.js
```

Add:

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

**Concept:**
A *database pool* keeps multiple connections open so our server can use them quickly.

---

# 🚀 1.8 Create the Main Server File

Create:

```
server.js
```

Add:

```js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import db from './src/config/db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

You now have a working backend.

---

# 📘 Lesson 2: Adding Swagger API Documentation

Swagger gives your API a visual UI for testing and documentation.

## 🎯 Goal of Lesson 2

* Create a Swagger YAML file.
* Load Swagger in Express.
* View interactive API docs.

---

# 📄 2.1 Create Swagger YAML

Create:

```
src/config/swagger.yaml
```

Add:

```yaml
openapi: 3.0.0
info:
  title: Cooking App Backend API
  description: API for managing Recipes, Pantry, and User Data.
  version: 1.0.0

servers:
  - url: http://localhost:5000/api/v1
    description: Development Server

paths:
  /test:
    get:
      summary: Basic server status check
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: Server is running! API is ready.
```

---

# 🧩 2.2 Load Swagger in server.js

Update **server.js**:

```js
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const swaggerPath = path.resolve(process.cwd(), 'src/config/swagger.yaml');
const swaggerDocument = YAML.load(swaggerPath);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
```

Now start your server:

```
npm run dev
```

Visit:

```
http://localhost:5000/api-docs
```

You will see the full Swagger UI.

---

# 🎉 Success!

You have:

* Project folder structure
* Environment variables
* PostgreSQL connection pool
* Express server
* Swagger documentation UI

This document can now be used as a **teaching guide**, ideal for complete beginners.

---

Would you like the next teaching document: **Lesson 3 – Pantry API CRUD (Routes, Controllers, Services)?**
