const {Router } = require ('express');
const {User} =require ('../models');
const asyncHandler = require('../utils/async-handler');
const hashPassword = require('../utils/hash-password')
const formCheck = require('../services/userService')
const check = require('../services/userService')
const router = Router();


//회원가입
router.post('/join', asyncHandler(async (req,res,next)=>{
    const {password,name,address,phoneNumber,email}=req.body;
     const hashedPassword = hashPassword(password)//비밀번호 해쉬화
    formCheck.check(password,email,phoneNumber)
    try{
   const user = await User.create({
     email,
      password: hashedPassword,
      name,
      phoneNumber,
      address
      })
    res.status(201).send({status:201,msg:`${name}님의 가입을 환영합니다.`,user})
    res.redirect('/')
    }
    catch(err){next(err)}
}))

//개인 정보 조회
router.get('/myinfo' ,asyncHandler(async(req,res,next)=>{
  try{
  const viewkey = req.body.email
  const Profile = await User.findOne({email:viewkey}).populate('orderList')
  res.status(200).send({
    status:200,
    msg:`${Profile.name}님의 개인 정보입니다.`,
    email:Profile.email,
    name:Profile.name,
    address:Profile.address,
    phoneNumber:Profile.phoneNumber,
    orderlist:Profile.orderlist
  })
  }
  catch(err){
    next(err)
  }
}))

router.put('/modify', asyncHandler(async(req,res,next)=>{
  
  const {password,name,address,phoneNumber,email} = req.body
try{
  formCheck.check(password,email,phoneNumber)
  const updateUser =await User.updateOne({email},{
    password:hashPassword(req.body.password),
    name:req.body.name,
    address:req.body.address,
    phoneNumber:req.body.phoneNumber,
    })
  res.status(200).send({status:200, msg:'개인정보가 수정됐습니다'})
  }
  catch(err){next(err)}
}))

//회원 탈퇴
router.delete('/withdraw',asyncHandler(async(req,res,next)=>{
  try{
  const {email,name} = req.body
  await User.deleteOne({email})
  res.status(200).send({status:200, msg:`${name}님의 탈퇴가 완료됐습니다.`})
  }
  catch(err){next(err)}
}))






module.exports = router;