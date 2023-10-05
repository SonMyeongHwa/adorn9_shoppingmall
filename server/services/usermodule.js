exports.mailformCheck = (email) => {
 
  const regExp = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

  if(!regExp.test(email)){throw new Error('올바른 메일 양식을 기입해주세요.')}
}

exports.telCheck= (tel)=>{{
  const regExp1 = /^\d{3}-\d{4}-\d{4}$/
  const regExp2 = /^\d{11}$/

  if(!(regExp1.test(tel)||regExp2.test(tel))){
    throw new Error('올바른 전화번호를 입력해주세요.')
  }
}} 

exports.checker = (id,password,email,phone) =>{
  const emailregExp = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  const phoneExp1 = /^\d{3}-\d{4}-\d{4}$/
  const phoneExp2 = /^\d{11}$/
  
  if(!regExp.test(email)){
    throw new Error('올바른 메일 양식을 기입해주세요.')
  }
  if(!(regExp1.test(tel)||regExp2.test(tel))){
    throw new Error('올바른 전화번호를 입력해주세요.')
  }
}