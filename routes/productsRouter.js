import express from 'express';
import faker from 'faker';
import ProductsService from '../services/products.services.js';

const router = express.Router();
const service = new ProductsService();

//esto viene después de la ruta principal

//READ PRODUCTS
router.get('/', (req, res) => {
  const products = service.find();
  res.status(200).json(products);
});

//READ PRODUCT
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  res.status(200).json(product);
});

//CREATE PRODUCT
router.post('/', (req, res) => {
  const body = req.body;
  const response = service.create(body);
  res.status(201).json({
    response,
  });
});

//PARTIAL PRODUCT  UPTADE
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;
  const updateProduct = service.update(id, { name, price, image });
  if (updateProduct) {
    res.json({
      message: 'product Updated',
      data: req.body,
      id,
    });
  } else {
    res.status(501).json({
      message: 'Internal Error',
    });
  }
});

//DELETE PRODUCT
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const response = service.delete(id);
  if (response) {
    res.status(201).json({
      message: 'product Deleted',
      response,
    });
  } else {
    res.status(400).json({
      message: 'Product Not Found',
    });
  }
});

export default router;
