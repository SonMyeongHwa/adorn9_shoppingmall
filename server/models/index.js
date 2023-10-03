const mongoose = require('mongoose');

const OrderSchema = require('./schemas/order');
const ProductSchema = require('./schemas/product');
const UserSchema = require('./schemas/user');

exports.Product = mongoose.model('Product', OrderSchema);
exports.Product = mongoose.model('Product', ProductSchema);
exports.Product = mongoose.model('Product', UserSchema);