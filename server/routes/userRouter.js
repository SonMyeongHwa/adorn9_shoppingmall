const {Router } = require ('express');
const {User} =require ('../models');
const asyncHandler = require('../utils/async-handler');
const hashPassword = require('../utils/hash-password')
const router = Router();

// 전체 상품 조회. 요청 URI : GET ~~/api/v1/products
router.get('/' ,(req,res)=>{
  res.send('ok')
})

router.post('/join', asyncHandler(async (req,res)=>{
    const {email,name,password,address,phone,id}=req.body;

    const mailCheck = await User.findOne(email)
    
    if(mailCheck) {throw new Error("이미 가입된 메일입니다.")}
    if(password.length < 8) {throw new Error("비밀번호는 8자 이상으로 설정해주세요.")}
    
    const hashedPassword = hashPassword(password)
    const user = await User.create({
      
      id,
      password: hashedPassword,
      email,
      name,
      address,
      phone
      
    })
    res.redirect('/')
}))





module.exports = router;