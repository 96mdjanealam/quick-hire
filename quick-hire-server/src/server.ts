import dns from 'dns';

if (process.env.NODE_ENV !== 'production') {
    dns.setServers(['1.1.1.1', '8.8.8.8']);
}

import express, { Application } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db.js';
import { seedAdmin } from './config/seeder.js';
import errorHandler from './middleware/errorHandler.js';

// Load env vars
dotenv.config();

// Connect to database
await connectDB();
await seedAdmin();

// Route files
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app: Application = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security middleware
app.use(helmet());
app.use(cors());

// Root route
app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Welcome to QuickHire API' });
});

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
