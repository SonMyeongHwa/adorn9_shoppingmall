const { Schema } = require ('mongoose');

const UserSchema = new Schema({
  email: {
    type:String,
    required:true,
    unique: true
   }, //유저 이메일
  password: {
    type:String,
    required:true
   }, //유저 비밀번호
  name: {
    type:String,
    required:true
   }, //유저 이름
  phone: {
    type:Number,
    required:true
   }, // 유저 전화번호
  address: {
    type:String,
  }, // 유저 주소
  birth: {
    type:Number,
   }, //유저 생일
  orderList: [{ type: Schema.Types.ObjectId, ref: "Order" }], //유저 주문내역
},{timestamps: true})

module.exports = {UserSchema};