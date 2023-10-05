const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');

const productRouter = require('./routes/productRouter');

const session = require('express-session');
const passport = require('passport'); 
const loginRouter = require('./routes/loginRouter'); // 로그인 라우터 불러오기
//const bodyParser = require('body-parser');
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
    secret: 'team9', // 세션을 암호화하기 위한 키
    resave: false,
    saveUninitialized: false
  }));

app.use(passport.initialize());
app.use(passport.session());
//app.use(bodyParser.json());

app.use('/api/v1/products', productRouter);

// 로그인 라우터 추가
app.use('/users', loginRouter); 

app.use('/', (req,res) => {
    res.send('ok');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server start with port:${PORT}`);
}); 