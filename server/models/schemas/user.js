const {Schema} = require ('mongoose');

const UserSchema = new Schema({
  
  email: {
    type:String,
    required:true,
    unique:true
   }, //유저 이메일
  password: {
    type:String,
    required:true
   }, //유저 비밀번호
  name: {
    type:String,
    required:true
   }, //유저 이름
  address: {
    type:String,
    required:true
   }, // 유저 주소
  phone: {
    type:String,
    required:true
   }, // 유저 전화번호
  birth: {
    type:Number,
   }, //유저 생일
   joindate:{
    type:Number
   },
  orderList: Number //유저 주문내역
},{timestamps: {createdAt:'가입일자'}})

module.exports = {UserSchema};