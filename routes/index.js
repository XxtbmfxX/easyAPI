import express from 'express';

//diferentes routers
import productsRouter from './productsRouter.js';

//agregamos todos los routers de esta forma
function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
}

export default routerApi;
