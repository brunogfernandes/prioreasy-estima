import express from 'express';
import {allRoutes} from './routes.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(allRoutes);

app.listen(3333, () => {
    console.log("[INFO] Server running on port 3333");
    console.log("[INFO] System operation logs:");
});