import {Schema} from 'mongoose'

const UserSchema = new Schema({
  id: {
    type:String,
    required:true
   }, //유저 ID
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
    type:Number,
    required:true
   }, // 유저 전화번호
  email: {
    type:String,
    required:true
   }, //유저 이메일
  birth: {
    type:Number,
    required:true
   }, //유저 생일
  orderList: Number //유저 주문내역
},{timestamps: true})

export {UserSchema};