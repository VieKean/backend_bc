import mainService from '../services/mainService.js';
const getHomepage = async (req, res) => {
    try {
        const counts = await mainService.getCounts();

        res.render('home.ejs', {
            data: {
                page: null,
                username: req.session.user.username,
                totalAccounts: counts.totalAccounts,
                totalProducts: counts.totalProducts,
                totalOrders: counts.totalOrders,
                totalCustomers: counts.totalCustomers
            }
        });
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
};

export default { getHomepage };
