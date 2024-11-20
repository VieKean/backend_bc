import db from "../models/index";

// Cập nhật số lượng sản phẩm trong giỏ hàng
const updateQuantityInCart = async (req, res) => {
    const { id, quantity } = req.body;  // id là ID của sản phẩm trong giỏ hàng, quantity là số lượng mới

    try {
        // Kiểm tra xem sản phẩm có tồn tại trong giỏ hàng của khách hàng hay không
        const cartItem = await db.Cart.findOne({
            where: { id: id },  // Sử dụng ID của giỏ hàng để tìm sản phẩm
        });

        if (!cartItem) {
            return res.status(404).json({
                err: 1,
                message: 'Sản phẩm không có trong giỏ hàng của bạn.',
            });
        }

        // Kiểm tra số lượng mới hợp lệ (phải là một số dương)
        if (quantity <= 0) {
            return res.status(400).json({
                err: 1,
                message: 'Số lượng phải lớn hơn 0.',
            });
        }

        // Cập nhật số lượng mới cho sản phẩm
        cartItem.quantity = quantity;

        // Lưu thay đổi vào cơ sở dữ liệu
        await cartItem.save();

        return res.status(200).json({
            err: 0,
            message: 'Cập nhật số lượng sản phẩm thành công.',
            data: cartItem,
        });
    } catch (error) {
        console.error('Error updating quantity in cart:', error);
        return res.status(500).json({
            err: 1,
            message: 'Lỗi khi cập nhật số lượng sản phẩm.',
        });
    }
};

export default { updateQuantityInCart };
