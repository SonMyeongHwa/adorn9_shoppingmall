

 

module.exports = (tel)=>{{
  const regExp1 = /^\d{3}-\d{4}-\d{4}$/
  const regExp2 = /^\d{11}$/

  if(!(regExp1.test(tel)||regExp2.test(tel))){
    throw new Error('올바른 전화번호를 입력해주세요.')
  }
}} 