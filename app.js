import cors from 'cors';
import express from 'express';

// Import routes
import userRoutes from './src/collections/user/user.route.js';
import recordRoutes from './src/collections/record/record.route.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/user', userRoutes);
app.use('/record', recordRoutes);

export default app;