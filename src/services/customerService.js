import db from '../models/index';
// Service
const getAllCustomer = async () => {
    try {
        const customers = await db.Customer.findAll({});
        return customers.map(customer => customer.get({ plain: true })); // Trả về dữ liệu thuần (plain data)
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
};
const getCustomerById = async (customerId) => {
    try {
        const customer = await db.Customer.findByPk(customerId);
        return customer;
    } catch (error) {
        console.error('Error fetching customer:', error);
        throw error;
    }
};




export default { getAllCustomer, getCustomerById }