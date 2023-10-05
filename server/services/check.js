// exports.check=(user) =>{
//   const {id,password}= user
  
//   function bab (){console.log('bab')}
  
// }
class check{

  constructor()
async check(user) {
  const {id,email}= user;
  const userId = await user.findOne({id})
  const userEmail = await user.findOne({email}) 
  if(userId){
    throw new Error('이미 존재하는 ID입니다.')
  }
  if(userEmail){
    throw new Error('이미 존재하는 이메일입니다.')
  }
}

}

const {check} = new check()

module.exports = {check}