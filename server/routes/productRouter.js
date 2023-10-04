const { Router } = require('express');
const { Product, Category } = require('../models');
const asyncHandler = require('../utils/async-handler');

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

// 특정 상품 조회. 요청 URI : GET ~~/api/v1/products/:상품id
router.get('/:id', asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findOne({_id : productId});
  if(!product){
    return res.status(404).json({
      status: 404,
      msg: `해당 id를 가진 상품이 존재하지 않습니다`,
    })
  }
  return res.status(200).json({
    status: 200,
    msg: `id:${productId} 상품 검색 결과`,
    product,
  });
}));

// 카테고리로 검색. 요청 URI : GET ~~/api/v1/products/category/necklace
router.get('/category/:category', asyncHandler(async (req, res) => {
  const categoryName = req.params.category;
  if(categoryName){
    const categoryCol = await Category.findOne({ name: categoryName });
    if(categoryCol){
      const products = await Product.find({ category:categoryCol._id })
      if(products){
        return res.status(200).json({
          status:200,
          msg: `${categoryName}으로 검색결과`,
          products: products,
        });
      }else{
        return res.status(404).json({
          status:404,
          msg: `${categoryName}에 상품이 없습니다`
        })
      }
    }else{
      return res.status(404).json({
        status:404,
        msg: "존재하지 않는 카테고리입니다",
      })
    }
  }else{
    return res.status(400).json({
      status:400,
      msg: "검색내용을 확인해주세요",
    })
  }
}));

module.exports = router;