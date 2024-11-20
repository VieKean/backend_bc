import orderService from "../services/orderService";

const handleOrderPage = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        console.log('Rendering page:', 'order'); // Debug log
        res.render('home', {
            data: {
                title: 'Order List',
                page: 'order', // Ensure 'order' matches the correct filename in views
                rows: orders,
                username: req.session.user.username,
            }
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send('Internal Server Error');
    }
};
const handleUpdateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;  // Get the orderId from the URL parameter
        const { status, changeReason } = req.body;  // Get the status and change reason from the form body
        const updatedBy = req.session.user.username;  // Get logged-in user's username from session

        if (!updatedBy) {
            console.error('No username found in session.');
            return res.status(400).send('User is not authenticated.');
        }

        // Update order status
        await orderService.updateOrderStatus(orderId, status, updatedBy, changeReason);  // Pass updatedBy and changeReason

        res.redirect('/order');  // Redirect back to the orders page
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).send('Internal Server Error');
    }
};

const handleOrderDetailPage = async (req, res) => {
    try {
        const orderId = req.params.id;
        const orderDetail = await orderService.getDetailById(orderId);
        const orderStatusHistory = await orderService.getOrderStatusHistory(orderId);
        
        // Make sure orderDetail is passed as 'orderdetail'
        res.render('home', {
            data: {
                title: 'Order Details',
                page: 'orderdetail',
                orderdetail: orderDetail, // Correctly passed as 'orderdetail'
                orderStatusHistory: orderStatusHistory,
                username: req.session.user.username,
            }
        });
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).send('Internal Server Error');
    }
};






export default { handleOrderPage, handleUpdateOrderStatus, handleOrderDetailPage };