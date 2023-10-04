const { Router } = require('express');
const router = Router();

const productRouter = require('./productRouter');

// 요청URL : ~~/api/v1/products 인 경우 이쪽으로
router.get('/v1/products', productRouter);

module.exports = router;