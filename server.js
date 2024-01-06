// Server config

// Import dependecies
import express from 'express';
import dotenv from 'dotenv';

// Import modules
import UseRoutes from './src/helpers/useRoutes';
import routes from './src/routes';

dotenv.config();
const app = express();

app.use(express.json()); // Configurando json no express

const useRoutes = new UseRoutes(app);
useRoutes.use(routes);

app.get('/', (req, res) => res.send('hello world!'));

export default app;
