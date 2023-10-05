const { Product, Category } = require('../models');

class ProductService {
    constructor(Product) {
        this.Product = Product;
    }

    async getCategoryProductsWithPage(category ,page, perPage) {
        const skipCount = (Number(page)-1)*Number(perPage);
          
        const categoryCollection = await Category.findOne({ name: category });
          
        if(!categoryCollection){
            const err = new Error("존재하지 않는 카테고리입니다.");
            err.status = 404;
            next(err);
        }
          
        const products = await Product.find({ category:categoryCollection._id }, null, { skip: skipCount, limit: perPage})
        if(!products){
            const err = new Error("상품이 존재하지 않습니다.");
            err.status = 404;
            next(err);
        }
        return res.status(200).json({
            status:200,
            msg: `${category} 카테고리 ${page}페이지`,
            products,
        });
    };

    // 특정 상품 조회
    async getProductById(productId) {
        // 우선 해당 상품이 db에 존재하는지 확인
        const product = await this.Product.findOne({_id:productId});
        if (!product) {
            const err = new Error("상품이 존재하지 않습니다.");
            err.status = 404;
            next(err);
        }

        return product;
    }
}

const productService = new ProductService(Product);

module.exports = { productService };