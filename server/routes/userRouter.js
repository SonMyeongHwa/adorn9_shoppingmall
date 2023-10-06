const {Router } = require ('express');
const {User} =require ('../models');
const asyncHandler = require('../utils/async-handler');
const hashPassword = require('../utils/hash-password')
// const telCheck = require('../services/telCheck')
const formCheck = require('../services/userService')
const check = require('../services/userService')
const router = Router();



router.post('/', asyncHandler(async (req,res)=>{
    const {password,name,address,phone,email}=req.body;
     const hashedPassword = hashPassword(password)//비밀번호 해쉬화
    formCheck.check(password,email,phone)
    //중복 이메일 체크
   const user = await User.create({
     email,
      password: hashedPassword,
      name,
      address,
      phone,
      })
    res.status(201).send({status:201,msg:`${name}님의 가입을 환영합니다.`,user})
    // res.redirect('/')
}))

//마이 프로필
router.post('/profile' ,asyncHandler(async(req,res)=>{
  const viewkey = req.body.email
  const Profile = await User.findOne({email:viewkey})
  res.status(200).send({status:200,Profile})
}))

//유저 수정
router.put('/', asyncHandler(async(req,res)=>{
  
  const {password,name,address,phone,email} = req.body
   //중복 이메일 체크
     if(password.length<8) {throw new Error('비밀번호는 8글자 이상 입력해주세요')}

  const updateUser =await User.updateOne({email},{
    email:req.body.email,
    password:hashPassword(req.body.password),
    name:req.body.name,
    address:req.body.address,
    phone:req.body.phone,
    })
  res.status(200).send({status:200, msg:'개인정보가 수정됐습니다'})
}))

//회원 탈퇴
router.delete('/',asyncHandler(async(req,res)=>{
  const {email,name} = req.body
  await User.deleteOne({email})
  return res.status(200).send({status:200, msg:`${name}님의 탈퇴가 완료됐습니다.`})
}))






module.exports = router;