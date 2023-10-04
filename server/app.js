import {createRequire} from 'module'
const require = createRequire(import.meta.url)
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const MongoURL = process.env.MONGO_URL;
mongoose.connect(MongoURL);
mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected');
})

const app = express();

app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server start with port:${PORT}`);
});
