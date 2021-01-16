import express from 'express';
import helmet from 'helmet';
import routes from '../routes';
import db from './sequelize';

const app = express();

// Middlewares
app.use(helmet());
app.use(express.json());

// Database
db.sequelize.sync();

// Routes
app.use('/api/v1', routes);

export default app;
