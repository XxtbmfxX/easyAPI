//diferentes routers

import productsRouter from './productsRouter.js';

//agregamos todos los routers de esta forma
function routerApi(app) {
  app.use('/products', productsRouter);
}

export default routerApi;
