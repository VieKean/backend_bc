
import customerService from "../services/customerService";

const fetchOneCustomer = async (req, res) => {
    let id = req.params.id
    try {
        const customer = await customerService.getCustomerById(id);
        res.status(200).json(customer);
    } catch (err) {
        console.error('Failed to fetch customer:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateCustomer = (req, res) => {
    try {

    }
    catch (err) {
        console.error('Failed to fetch customer:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}
export default { fetchOneCustomer, updateCustomer };