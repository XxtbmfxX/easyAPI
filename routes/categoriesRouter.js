import express from 'express';

const router = express.Router();

router.get('categoryId/products/:productId', (req, res) => {
  const { categoryId, producId } = req.params;
  res.jsonp({
    categoryId,
    producId,
  });
});

export default router;
