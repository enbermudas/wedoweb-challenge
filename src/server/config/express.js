import express from 'express';
import helmet from 'helmet';
import routes from '../routes';

const app = express();

// Middlewares
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/v1', routes);

export default app;
