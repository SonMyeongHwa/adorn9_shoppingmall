const {Router } = require ('express');
const {User} =require ('../models');
const asyncHandler = require('../utils/async-handler');
const hashPassword = require('../utils/hash-password')
const router = Router();

// 전체 상품 조회. 요청 URI : GET ~~/api/v1/products
router.get('/', asyncHandler(async (req, res) => {
    const products = await User.find({});
    return res.status(200).json({
    status: 200,
    msg: "전체 상품 리스트",
    products,
  });
}));

router.post('/join', asyncHandler(async (req,res)=>{
    const {email,name,password}=req.body;

    const mailCheck = await User.findOne(email)

    if(mailCheck) {throw new Error("이미 가입된 메일입니다.")}
    
    const 

    const hashedPassword = hashPassword(password)
    const user = await User.create({
      email,
      name,
      password: hashedPassword
    })
    res.redirect('/')
}))





module.exports = router;