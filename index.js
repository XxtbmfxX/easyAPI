import express from 'express';
import routerApi from './routes/index.js';

const app = express();
const port = 3000;

//MIDDLEWARES

app.use(express.json());

//HOME
app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

//ROUTES
routerApi(app);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
