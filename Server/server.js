import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import path from "path";
import {fileURLToPath} from "url";

import authRoutes from './routes/authRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import claimRoutes from './routes/claimRoutes.js';
import eventRoutes from './routes/eventRoutes.js'

dotenv.config();

const app = express();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(bodyParser.json());

app.get("/",(req,res)=>{
  console.log("base route hit");
  res.send("ShareBite backend is running");
})

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/claims', claimRoutes);
app.use('/api/events', eventRoutes);

app.use(express.static(path.join(__dirname, "dist")));

app.get(".*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});