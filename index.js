import express from 'express';
import routerApi from './routes/index.js';
import cors from 'cors';

import {
  logErrors,
  errorHandler,
  boomErrorHandler,
} from './middlewares/errorHandler.js';

const app = express();
const port = 3000;

//BODY PARSERS
app.use(express.json());

//origenes de los que quiero recibir peticiones
const whitelist = ['http://127.0.0.1:5500', 'http://mydomain.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};

app.use(cors(options));

//HOME
app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

//ROUTES
routerApi(app);

//MIDDLEWARES

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
