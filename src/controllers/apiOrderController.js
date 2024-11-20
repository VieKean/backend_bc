import orderService from "../services/orderService";
const handleCreateOrder = async (req, res) => {
    try {
        const orderData = req.body;
    
        // Validate input
        if (!orderData.customer_id || !orderData.orderDetails || orderData.orderDetails.length === 0) {
          return res.status(400).json({ success: false, message: 'Invalid order data' });
        }
    
        const result = await createOrder(orderData);
        res.status(201).json({ success: true, orderId: result.orderId });
      } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, message: 'Server error' });
      }
}

export default {handleCreateOrder};