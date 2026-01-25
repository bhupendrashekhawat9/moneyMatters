import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import connectDB from './config/db';
import { PORT } from './config/constants';

// Connect to database
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
});
