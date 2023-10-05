const {Router } = require ('express');
const {User} =require ('../models');
const asyncHandler = require('../utils/async-handler');
const hashPassword = require('../utils/hash-password')
const router = Router();


router.get('/' ,asyncHandler(async(req,res)=>{
  const userProfile = await User.find({})
  res.send(userProfile)
  res.send('okaaa')
}))

router.post('/join', asyncHandler(async (req,res)=>{
    const {email,name,password,address,phone,id}=req.body;

    // const mailCheck = await User.findOne(email)
    //  const hashedPassword = hashPassword(password)
   const user = await User.create({
      id,
      // password: hashedPassword,
      password,
      email,
      name,
      address,
      phone
      })
    res.set(user)
    // res.redirect('/')
}))


// router.delete('/quit',asyncHandler(async(req,res))=>
//   )






module.exports = router;