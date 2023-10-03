const { Schema } = require('mongoose')

const UserSchema = new Schema({
  UserId: {
    type:String,
    required:true
   }, //유저 ID
  UserPassword: {
    type:String,
    required:true
   }, //유저 비밀번호
  UserName: {
    type:String,
    required:true
   }, //유저 이름
  UserAddress: {
    type:String,
    required:true
   }, // 유저 주소
  UserPhone: {
    type:Number,
    required:true
   }, // 유저 전화번호
  UserEmail: {
    type:String,
    required:true
   }, //유저 이메일
  UserBirth: {
    type:Number,
    required:true
   }, //유저 생일
  OrderList: Number //유저 주문내역
},{timestamps: true})

module.exports = { UserSchema };