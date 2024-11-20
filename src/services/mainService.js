import db from "../models/index";
const getCounts = async () => {
    try {
        const [countOrder, countProduct, countAccount, countCustomer] = await Promise.all([
            db.Order.count(),
            db.Product.count(),
            db.Account.count(),
            db.Customer.count()
        ]);
        return {
            totalAccounts: countAccount,
            totalProducts: countProduct,
            totalOrders: countOrder,
            totalCustomers: countCustomer
        };
    } catch (error) {
        console.log(error);
    }
}
export default { getCounts };

