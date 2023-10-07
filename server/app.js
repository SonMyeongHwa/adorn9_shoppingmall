const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');

const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter')
const orderRouter = require('./routes/orderRouter');
const loginRouter = require('./routes/loginRouter');
const session = require('express-session');
const passport = require('passport'); 



require('dotenv').config();

const MongoURL = process.env.MONGO_URL;
mongoose.connect(MongoURL);
mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected');
})

require('./passport')();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SESSION_SECRET, // 세션을 암호화하기 위한 키
    // cookie: { maxAge: 60 * 60 * 1000 }, // <- 세선 만료 기간을 1시간으로 설정
    resave: false, // 세션을 언제나 저장할지
    saveUninitialized: false // 세션이 저장되기 전에 uninitialized 상태로 미리 만들어서 저장할지
  }));

app.use(passport.initialize());
app.use(passport.session());
//app.use(bodyParser.json());

app.use('/api/v1/products', productRouter);
app.use('/users', userRouter)
app.use('/api/v1/orders', orderRouter);

// 나중에 userRouter로 합치게 될 것 같아서 일단 path만 /users로 변경해놨습니다..!
app.use('/users', loginRouter);
app.use('/', (req,res) => {
    res.send('ok');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server start with port:${PORT}`);
}); 
