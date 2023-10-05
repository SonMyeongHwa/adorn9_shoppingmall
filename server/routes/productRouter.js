const { Router } = require('express');
const { Product, Category } = require('../models');
const asyncHandler = require('../utils/async-handler');
const { productService } = require('../services');

const router = Router();

// 전체 상품 조회. 요청 URI : GET ~~/api/v1/products
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({});
    return res.status(200).json({
    status: 200,
    msg: "전체 상품 리스트",
    products,
  });
}));

// 메인 페이지 상품 조회(임시)
router.get('/main', asyncHandler(async (req, res) => {
  res.send('main page');
}));

// 카테고리 + 페이지네이션. 요청 URI : GET ~~/api/v1/products/category?category=ring&page=1
router.get('/category', asyncHandler(async (req, res) => {
  const { category, page } = req.query;
  const productList = await productService.getCategoryitemPage(category ,page);

  return res.status(200).json({
    status:200,
    msg: `${category} 카테고리 ${page}페이지`,
    productList,
  });
}));

// 특정 상품 조회. 요청 URI : GET ~~/api/v1/products/:상품id
router.get('/:id', asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await productService.getProductById(productId);
  return res.status(200).json({
    status: 200,
    msg: `id:${productId} 상품 검색 결과`,
    product,
  });
}));

// 카테고리로 검색. 요청 URI : GET ~~/api/v1/products/category/necklace
router.get('/category/:category', asyncHandler(async (req, res, next) => {
  const categoryName = req.params.category;

  const categoryCol = await Category.findOne({ name: categoryName });

  if(!categoryCol){
    const err = new Error("존재하지 않는 카테고리입니다.");
    err.status = 404;
    next(err);
  }

  const products = await Product.find({ category:categoryCol._id })
  if(!products){
    const err = new Error("상품이 존재하지 않습니다.");
    err.status = 404;
    next(err);
  }

  return res.status(200).json({
    status:200,
    msg: `${categoryName}으로 검색결과`,
    products,
  });
}));

module.exports = router;