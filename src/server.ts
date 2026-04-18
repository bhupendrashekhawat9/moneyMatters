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
  setInterval(() => {
    fetch(`${process.env.PROD_URL}/`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      keepalive: true,
      
    }).catch(() => {
      console.error('Failed to fetch API documentation');
    });

  }, 40000); // Log every 50 seconds to keep the server alive
});
