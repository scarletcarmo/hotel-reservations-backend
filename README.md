echo "# git  Reservations Backend
Proyecto backend para sistema de reservas de hotel, construido con **Express.js**, **TypeScript** y **PostgreSQL**.

---

##  Tecnologías

- Node.js
- Express 5
- TypeScript
- PostgreSQL
- ts-node-dev

---

##  Instalación

### 1. Clonar el proyecto

\`\`\`bash
git clone https://github.com/tuusuario/reservations-backend.git
cd reservations-backend
\`\`\`

### 2. Instalar dependencias

\`\`\`bash
npm install
\`\`\`

O manualmente:

\`\`\`bash
npm install express@5.1.0
npm install -D @types/express@5.0.2 @types/node@22.15.21 typescript@5.8.3 ts-node-dev@2.0.0
\`\`\`

---

##  Scripts disponibles

\`\`\`bash
npm run dev     # Inicia el servidor en desarrollo
npm run build   # Compila TypeScript a JS
npm start       # Ejecuta desde dist/
\`\`\`

---

##  Base de datos

Base: \`reservations_db\`  
Usuario: \`postgres\`  
Puerto: \`5432\`

### Ejemplo de conexión (db.ts)

\`\`\`ts
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reservations_db',
  password: 'TU_CONTRASEÑA',
  port: 5432,
});
\`\`\`

---

##  Estructura del proyecto

\`\`\`
src/
├── index.ts       # Inicio del servidor Express
├── db.ts          # Conexión a PostgreSQL
\`\`\`

---

##  Notas

- Ver tablas: \`\\dt\`
- Ver columnas: \`\\d users\`
- Reinstalar: \`npm install\`

- Probar pool \`npx ts-node src/testConnection.ts\`


" > README.md

