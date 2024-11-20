import categoryService from '../services/categoryService.js';

const fetchAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategory();
        res.status(200).json(categories);
    } catch (err) {
        console.error('Failed to fetch categories:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export default { fetchAllCategories };