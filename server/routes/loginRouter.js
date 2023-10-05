const { Router } = require('express');
const passport = require('../passport'); 
const asyncHandler = require('../utils/async-handler');
const router = Router();

router.post('/', passport.authenticate('local'), asyncHandler(async (req, res) => {
  // 로그인 성공 시 처리
  res.status(200).json({
    message: 'Login successful'
  });
}));

// router.post('/', passport.authenticate('local'), {
//     successRedirect: '/auth',
//     failureRedirect: '/auth/login',
//     failureFlash: false
// });

module.exports = router;