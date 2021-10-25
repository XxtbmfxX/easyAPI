import express from 'express';
import faker from 'faker';
import ProductsService from '../services/products.services.js';

const router = express.Router();
const service = new ProductsService();

//esto viene después de la ruta principal

//READ PRODUCTS
router.get('/', async (req, res) => {
  const products = await service.find();
  res.status(200).json(products);
});

//READ PRODUCT
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await service.findOne(id);
  res.status(200).json(product);
});

//CREATE PRODUCT
router.post('/', async (req, res) => {
  const body = req.body;
  const response = await service.create(body);
  res.status(201).json(response);
});

//PARTIAL PRODUCT  UPTADE
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, image } = req.body;
    const updateProduct = await service.update(id, { name, price, image });
    res.json({
      message: 'Product updated',
      updateProduct,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Product not found',
    });
  }
});

//DELETE PRODUCT
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await service.delete(id);
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
