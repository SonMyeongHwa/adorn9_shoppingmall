const { Schema } = require('mongoose');

const OrderSchema = new Schema({
    number: { // 주문번호
        type: String,
        required: true,
    },
    items: [ // 품목별 이름과 개수가 들어있는 배열 
        {
            id: { type: Schema.Types.ObjectId, ref: "Item"},
            quantity: Number,
            price: Number,
        },
    ],
    total_price: { // 총 가격
        type: Number,
        required: true,
    },
    user_name: { // 주문자명
        type: String,
        required: true,
    },
    address: { // 배송지
        type: String,
        required: true,
    },  
    phone_number: { // 전화번호
        type: String,
        required: true,
    },
},

{
    timestamps: true,// 주문시간
});

module.exports = { OrderSchema };