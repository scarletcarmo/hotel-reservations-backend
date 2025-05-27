import express, { Request, Response } from 'express';
import userRoutes  from './routes/user.routes'
import { printRoutes } from './utils/printRoutes';
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users',userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola desde Express con TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  printRoutes(app);
});