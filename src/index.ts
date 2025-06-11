import express from 'express';
import router from './routes';
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1', router);
  // Se usa "/api/v1/" como prefijo común para todas las rutas

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  //printRoutes(app);
});