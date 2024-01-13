// Server config

// Import dependecies
import express from 'express';
import dotenv from 'dotenv';

// Import modules
import UseRoutes from './helpers/useRoutes';
import routes from './routes';

dotenv.config();
const app = express();

app.use(express.json()); // Configurando json no express

const useRoutes = new UseRoutes(app);
useRoutes.use(routes);

export default app;
