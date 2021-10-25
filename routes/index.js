import express from 'express';

//diferentes routers
import productsRouter from './productsRouter.js';
import categoriesRouter from './categoriesRouter.js';
import usersRouter from './usersRouter.js';

//agregamos todos los routers de esta forma
function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
}

export default routerApi;
