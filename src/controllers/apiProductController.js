import productService from "../services/productService";

const fetchAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (err) {
        console.error('Failed to fetch products:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productService.getProductById(productId);
        res.status(200).json(product);
    } catch (err) {
        console.error('Failed to fetch product:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const fetchProductsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const products = await productService.getProductByCategory(categoryId);
        res.status(200).json(products);
        
    } catch (err) {
        console.error('Failed to fetch products by category:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default { fetchAllProducts, getProductById, fetchProductsByCategory };
