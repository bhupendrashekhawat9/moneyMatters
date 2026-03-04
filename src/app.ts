import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { errorHandler, notFound } from './middlewares/errorMiddleware';
import {
  authRoutes,
  profileRoutes,
  accountRoutes,
  categoryRoutes,
  transactionRoutes,
  budgetRoutes,
  goalRoutes,
  insightRoutes,
} from './routes';
import swaggerSpec from './config/swagger';

const app: Application = express();
app.get('/', (req, res) => {
    res.send('API is running...');
});
// Security middleware
app.use(helmet());
app.use(cors());
// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Swagger documentation

app.use('/',(req,_res,next)=>{
  console.log(`${req.method} ${req.originalUrl}`);
  console.log(req.body);
  next();
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'MoneyMatters API Documentation',
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/insights', insightRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Swagger JSON endpoint
app.get('/api/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
