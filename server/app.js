const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');

const productRouter = require('./routes/productRouter');

const session = require('express-session');
const passport = require('./passport'); 
const loginRouter = require('./routes/loginRouter'); // 로그인 라우터 불러오기

require('dotenv').config();

const MongoURL = process.env.MONGO_URL;
mongoose.connect(MongoURL);
mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected');
})

const app = express();


app.use(cors());

// 미들웨어 설정

app.use(express.json());
app.use(session({
    secret: 'your-secret-key', // 세션을 암호화하기 위한 키
    resave: false,
    saveUninitialized: false
  }));

app.use(passport.initialize());
app.use(passport.session());


// app.get('/', (req, res) => {
//     res.send('hello world!!')
// })

app.use('/', (req,res) => {
    res.send('ok');
});

// 로그인 라우터 추가
app.use('/login', loginRouter, (req,res) => {
    res.send('aa');
}); 

app.use('/api/v1/products', productRouter);

app.use('/', (req,res) => {
    res.send('ok');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server start with port:${PORT}`);
}); 