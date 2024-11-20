import customerService from "../services/customerService";

const handleCustomerPage = async (req, res) => {
    try {
        const customerList = await customerService.getAllCustomer();
        res.render('home', {
            data: {
                title: 'List of Customers',
                page: 'customer',
                rows: customerList,
                username: req.session.user.username
            }
        });
    } catch (error) {
        console.error('Error fetching customer list:', error);
        res.status(500).send('Internal Server Error');
    }
};
const handleCustomerDetailPage = async (req, res) => {
    const customerId = req.params.id;
    try {
        const customer = await customerService.getCustomerById(customerId); 
        res.render('home', { 
            data: {
                title: 'Customer Details',
                customer: customer,
                page: 'customer-view-detail',
                username: req.session.user.username
            }
        });
    } catch (error) {
        console.error('Error fetching customer details:', error);
        res.status(500).send('Internal Server Error');
    }
};


export default { handleCustomerPage, handleCustomerDetailPage };