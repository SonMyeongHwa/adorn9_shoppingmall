const {Router } = require ('express');
const {User} =require ('../models');
const asyncHandler = require('../utils/async-handler');
const hashPassword = require('../utils/hash-password')
const router = Router();




//회원가입
router.post('/', asyncHandler(async (req,res)=>{
    const {id,password,name,address,phone,email}=req.body;
    // const joindate = req.body.createdAt;
    console.log(req.body.createdAt)
    // const mailCheck = await User.findOne(email)
     const hashedPassword = hashPassword(password)//비밀번호 해쉬화
    const mailcheck = await User.findOne({email})//중복 이메일 체크 변수
     if(mailcheck) {throw new Error('이미 가입된 이메일입니다.')} //중복 이메일 체크
     if(password.length<8) {throw new Error('비밀번호는 8글자 이상 입력해주세요')}//비번 자릿수 체크
    //  if(id.length<8 )
     
   const user = await User.create({
      id,
      password: hashedPassword,
      name,
      address,
      phone,
      email,
      // joindate
      })
    res.send(user)
    // res.redirect('/')
}))

//마이 프로필
router.post('/profile' ,asyncHandler(async(req,res)=>{
  const viewkey = req.body.id
  const Profile = await User.findOne({"id":viewkey})
  res.send(userProfile)
}))

//유저 수정
router.put('/', asyncHandler(async(req,res)=>{
  
  // const {id,password,name,address,phone,email} = req.body
  const id = req.body.id
  User.findOneAndUpdate({id},{
    name:req.body.name,
    }).exec().then((updateUser)=>
  res.send(updateUser))
  
}))

//회원 탈퇴 미구현
router.delete('/',asyncHandler(async(req,res)=>{
  const deid = req.body.id
  User.findOneAndDelete({id:deid})
  res.send('ok')

}))






module.exports = router;