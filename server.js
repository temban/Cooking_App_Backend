import express from 'express';
import cors from 'cors';
import 'dotenv/config'; 
import db from './src/config/db.js';
import { initDatabase } from './src/config/initDb.js';
import userRoutes from './src/routes/userRoutes.js';

// --- NEW SWAGGER IMPORTS ---
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path'; // Node.js built-in module for handling file paths

// --- 1. Initialization ---
const app = express();
const PORT = process.env.PORT || 5000; 

// --- Load Swagger Specification ---
// 1. Resolve the path to the swagger.yaml file
//    path.resolve() makes sure the file path works on all operating systems.
const swaggerPath = path.resolve(process.cwd(), 'src/config/swagger.yaml'); 
// 2. Load the YAML file and convert it into a JavaScript object
const swaggerDocument = YAML.load(swaggerPath); 


// --- 2. Middleware (Global Helpers) ---
app.use(cors());
app.use(express.json());
initDatabase();



// --- 3. SWAGGER ROUTE ---
// Tell Express: When a user visits /api-docs, use the swaggerUI middleware 
// to render the interactive documentation using our swaggerDocument blueprint.
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/v1', userRoutes);


// --- 4. Base Route (Test) ---
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Cooking App API." });
});

app.get('/show-name', (req, res) =>{
    res.json({message: "Emanuele"});
});

// --- 5. Start Listening ---
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📖 API Docs available at http://localhost:${PORT}/api-docs`);
});