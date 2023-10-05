



module.exports = (email) => {
 
  const regExp = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

  if(!regExp(mail)){throw new Error('올바른 메일 양식을 기입해주세요.')}
}
