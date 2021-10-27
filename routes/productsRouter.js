import express from 'express';
import ProductsService from '../services/products.services.js';
import { validatorHandler } from '../middlewares/validatorHandler.js';
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} from '../schemas/productsSchemas.js ';

const router = express.Router();
const service = new ProductsService();

//esto viene después de la ruta principal

//READ PRODUCTS
router.get('/', async (req, res) => {
  const products = await service.find();
  res.status(200).json(products);
});

//READ PRODUCT
router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res
        .status(200)
        .json(product ? product : { message: 'Product not found', id: id });
    } catch (error) {
      next(error);
    }
  }
);

//CREATE PRODUCT
router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),

  async (req, res) => {
    const body = req.body;
    const response = await service.create(body);
    res.status(201).json(response);
  }
);

//PARTIAL PRODUCT  UPTADE
router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, price, image } = req.body;
      const updateProduct = await service.update(id, { name, price, image });
      res.json({
        message: 'Product updated',
        updateProduct,
      });
    } catch (error) {
      next(error);
    }
  }
);

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
