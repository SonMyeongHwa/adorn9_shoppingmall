const express = require('express');
const mongoose = require('mongoose');
const productRouter = require('./routes/productRouter');
require('dotenv').config();

const MongoURL = process.env.MONGO_URL;
mongoose.connect(MongoURL);
mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected');
})

const app = express();

app.use(express.json());

app.use('/api/v1/products', productRouter);

app.use('/', (req,res) => {
    res.send('oka');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server start with port:${PORT}`);
});
