import { Express } from 'express';

export const printRoutes = (app: Express) => {
  console.log('\n📦 Rutas disponibles:');

  const routes = app._router?.stack ?? [];

  routes.forEach((middleware: any) => {
    if (middleware.route) {
      const methods = Object.keys(middleware.route.methods)
        .map((m) => m.toUpperCase())
        .join(', ');
      console.log(`  ${methods}  ${middleware.route.path}`);
    } else if (middleware.name === 'router' && middleware.handle.stack) {
      middleware.handle.stack.forEach((handler: any) => {
        if (handler.route) {
          const methods = Object.keys(handler.route.methods)
            .map((m) => m.toUpperCase())
            .join(', ');
          console.log(`  ${methods}  ${handler.route.path}`);
        }
      });
    }
  });
};
