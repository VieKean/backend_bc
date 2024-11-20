import db from "../models/index";


const addInCart = async (id_cus, id_prd, price, quantity) => {
    try {
        const cart = await db.Cart.create({ // Sử dụng bảng đúng
            customer_id: id_cus,
            product_id: id_prd,
            quantity: quantity,
            price: price,
        });

        return {
            err: '0',
            message: 'Thêm sản phẩm vào giỏ hàng thành công',
            data: cart, // Trả về thông tin giỏ hàng
        };
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};

const getCart = async (id_cus) => {

    try {
        const cartDetails = await db.Cart.findAll({
            where: { customer_id: id_cus },
            include: [
                {
                    model: db.Customer,
                    // as: 'Customer',
                    attributes: ['full_name'], // Chỉ lấy họ tên khách hàng
                },
                {
                    model: db.Product,
                    // as: 'Product',
                    attributes: ['product_name'], // Chỉ lấy tên sản phẩm
                },
            ],
        });

        return {
            err: 0,
            message: 'Fetched cart details successfully gnfcnb n',
            data: cartDetails,

        };

    } catch (error) {
        console.error('Error fetching cart details:', error);
        throw error;
    }

}

export default { addInCart, getCart }