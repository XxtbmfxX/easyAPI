import express from 'express';
import faker from 'faker';

const router = express.Router();

//esto viene después de la ruta principal

//READ PRODUCTS
router.get('/', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products);
});

//READ PRODUCT
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Product 2',
    price: 2000,
  });
});

//CREATE PRODUCT
router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: 'product created',
    data: body,
  });
});

//PARTIAL PRODUCT  UPTADE
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'product Updated',
    data: body,
    id,
  });
});

//DELETE PRODUCT
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'product Deleted',
    id,
  });
});

export default router;
