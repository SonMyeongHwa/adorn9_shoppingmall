const { Router } = require('express');
const { Product, Order } = require('../models');
const asyncHandler = require('../utils/async-handler');

const router = Router();

// ~~/api/v1/orders
// 장바구니에서 주문 후 결제완료되면 요청됨.
// client에서 req.body로 {name, items, address, phoneNum} 을 넘겨준다고 가정
// items는 배열. [ { item:Product참조타입, quantity:num }, {...}, {...} ] 과 같음
// 주문상태의 경우 상품준비중, 배송준비중, 배송중, 배송완료 의 4단계를 생각중

/* 임시로 작성한 프론트쪽 주문요청( api 테스트시 body에 넣고 테스트)
{
    "name": "홍길동",
    "items": [
        {
            "item":"651c4339bd2105949994c4b1",
            "quantity": 3
        }
    ],
    "address":"대한민국",
    "phoneNum":"01012345678"
}
*/

router.post('/', asyncHandler(async (req, res) => {
    const { name, items, address, phoneNum } = req.body;
    let totalPrice = 0;
    for(const obj of items){
        const objPrice = await Product.findOne({_id:obj.item});
        const itemPrice = obj.quantity * objPrice.get('price');
        totalPrice += itemPrice;
    }
    const data = {
        items,
        total_price: totalPrice,
        user_name: name,
        address,
        phone_number: phoneNum,
        status: "상품준비중",
    }

    const newOrder = await Order.create(data);

    return res.status(201).json({
        status:201,
        msg: "주문 완료되었습니다",
        orderId: newOrder._id,
        newOrder,
    })
}));

router.get('/:orderId', asyncHandler(async (req, res) => {
    const orderId = req.params.orderId;
    const order = await Order.findOne({ _id : orderId });
    if(order){
        res.status(200).json({
            status:200,
            msg:`주문번호 ${orderId} 검색결과 입니다`,
            order,
        })
    }else{
        res.status(404).json({
            status:404,
            msg:`해당하는 주문이 없습니다`
        })
    }
}));

router.delete('/:orderId', asyncHandler(async (req, res) => {
    const orderId = req.params.orderId;
    const order = await Order.findOne({ _id : orderId });
    if(!order){
        res.status(404).json({
            status:404,
            msg:`해당하는 주문이 없습니다`,
        });
    }else if(order.status !== "상품준비중"){
        res.status(403).json({
            status:403,
            msg:'배송이 완료된 경우 주문 취소가 불가능합니다. 관리자에게 문의해주세요',
        })
    }
    await Order.deleteOne({ _id : orderId });
    res.status(200).json({
        status:200,
        msg:"주문이 취소되었습니다."
    })
}));

module.exports = router;