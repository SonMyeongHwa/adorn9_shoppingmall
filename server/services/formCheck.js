
exports.checker = (id,password,email,phone) =>{
  const idRE = /^[a-z]+[a-z0-9]{5,19}$/g
  const passRE = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
  const emailRE = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  const phoneRE1 = /^\d{3}-\d{4}-\d{4}$/
  const phoneRE2 = /^\d{11}$/
  
  if(!idRE.test(id)){
    throw new Error('ID 작성 양식을 준수해주세요.')
  }//ID는 알파벳으로 시작하고 알파벳 혹은 숫자 6~20자로 제한
  if(!passRE.test(password)){
    throw new Error('비밀번호 작성 양식을 준수해주세요.')
  }//비밀번호는 8~16자에 알파벳,숫자,특수문자가 하나씩 포함돼야함
  if(!emailRE.test(email)){
    throw new Error('올바른 이메일을 입력해주세요.')
  }//email은 알파벳과 숫자의 갯수는 상관없지만 @과 .을 사이에 두는 일반적인 형태로 제한
  if(!(phoneRE1.test(phone)||phoneRE2.test(phone))){
    throw new Error('올바른 전화번호를 입력해주세요.')
  }//전화번호는 000-0000-0000 혹은 -를 뺀 형태로 제한
  
}

//아이디 중복검사 
//아이디 형태 검사

//비밀번호 형태검사 
//비밀번호 다시 입력

//이메일 양식 검사 clear
//전화번호 양식 검사 clear 

//생년월일 형식 검사 
