import db from '../models/index';  // Đảm bảo rằng db chứa tất cả các model, bao gồm OrderStatusHistory
import { sequelize } from '../models/index';

const getAllOrders = async () => {
    try {
        const orders = await db.Order.findAll({
            include: [
                {
                    model: db.Customer,
                    attributes: ['full_name'], // Include only the customer's full name
                }
            ],
            attributes: [
                'id',
                'order_date',
                [sequelize.cast(sequelize.col('total_price'), 'DECIMAL(10,2)'), 'total_price'],
                'payment_method',
                'status',
                'total_products',
            ],
        });
        return orders.map(order => ({
            ...order.toJSON(),
            total_price: parseFloat(order.total_price),
        }));
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

const updateOrderStatus = async (orderId, status, updatedBy, changeReason) => {
    try {
        const statusOrder = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        const order = await db.Order.findByPk(orderId);  // Get the order by ID

        if (!order) {
            console.warn(`Order with ID: ${orderId} not found.`);
            return;
        }

        const currentStatusIndex = statusOrder.indexOf(order.status);
        const newStatusIndex = statusOrder.indexOf(status);

        if (newStatusIndex <= currentStatusIndex) {
            console.warn('Cannot update status to a previous or same state.');
            return;
        }

        // Ensure `updatedBy` is not null
        if (!updatedBy) {
            throw new Error('The `updatedBy` field cannot be null');
        }

        // Save order status history
        const orderStatusHistory = await db.OrderStatusHistory.create({
            order_id: orderId,
            old_status: order.status,
            new_status: status,
            updated_by: updatedBy,  // This must not be null
            change_reason: changeReason || '',  // Default to empty if no reason
            createdAt: new Date(),  // Manually set the creation timestamp
            updatedAt: new Date()   // Manually set the update timestamp
        });

        console.log(`Order status history created: ${orderStatusHistory}`);

        // Update order status
        await order.update({ status });
        console.log(`Order with ID: ${orderId} updated to status: ${status}`);

    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};
const getDetailById = async (orderId) => {
    try {
        const orderDetail = await db.OrderDetail.findAll({
            where: { order_id: orderId },
            include: [
                {
                    model: db.Order,
                    attributes: ['id', 'order_date', 'total_price', 'payment_method', 'status', 'total_products'],
                    include: [
                        {
                            model: db.OrderStatusHistory,
                            attributes: ['old_status', 'new_status', 'updated_by', 'change_reason', 'updatedAt'],
                        }
                    ]
                },
                {
                    model: db.Product,
                    attributes: ['product_name', 'price', 'description', 'image'],
                }
            ],
        });
        return orderDetail;
    } catch (error) {
        console.error('Error fetching order details:', error);
        throw error;
    }
};

const getOrderStatusHistory = async (orderId) => {
    try {
        const orderStatusHistory = await db.OrderStatusHistory.findAll({ where: { order_id: orderId } });
        return orderStatusHistory;
    } catch (error) {
        console.error('Error fetching order status history:', error);
        throw error;
    }
};


const createOrder = async (orderData) => {
    try {
        // Insert order
        const orderResult = await db.Order.create({
            customer_id: orderData.customer_id,
            order_date: orderData.order_date,
            total_price: orderData.total_price,
            payment_method: orderData.payment_method,
            status: orderData.status,
            total_products: orderData.total_products,
        });

        const orderId = orderResult.id;

        // Insert order details
        for (const detail of orderData.orderDetails) {
            await db.OrderDetail.create({
                order_id: orderId,
                product_id: detail.product_id,
                quantity: detail.quantity,
                shipping_address: detail.shipping_address,
                order_notes: detail.order_notes,
            });
        }

        return { success: true, orderId };
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};



export default { getAllOrders, updateOrderStatus, getDetailById, getOrderStatusHistory, createOrder };
