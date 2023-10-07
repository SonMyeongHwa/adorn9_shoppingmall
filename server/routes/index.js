
const { Router } = require('express');
const router = Router();

const productRouter = require('./productRouter');
const userRouter = require('./userRouter')
const loginRouter = require('./loginRouter');
// 요청URL : ~~/api/v1/products 인 경우 이쪽으로
router.get('/v1/products', productRouter);
router.get('/users',userRouter)

module.exports = router;