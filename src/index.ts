import express, { Request, Response } from 'express';
import { printRoutes } from './utils/printRoutes';
import router from './routes';
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', router);  // Se usa "/api" como prefijo común para todas las rutas

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  printRoutes(app);
});