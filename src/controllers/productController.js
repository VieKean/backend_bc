import productServices from '../services/productService';
import categoryServices from '../services/categoryService';
import db from '../models/index';

const handleProductPage = async (req, res) => {
    try {
        let productList = await productServices.getAllProducts();
        const categories = await db.Category.findAll();
        res.render('home.ejs', {
            data: {
                title: 'Product List',
                page: 'product',
                rows: productList,
                categories: categories,
                username: req.session.user.username
            }
        });
    } catch (error) {
        console.error('Error fetching product data:', error);
        res.status(500).send('Internal Server Error');
    }
};

const handleCreateProduct = async (req, res) => {
    try {
        const { product_name, price, category_id, description, quantity } = req.body;

        // Kiểm tra nếu có file được tải lên
        let imageUrl = null;
        if (req.file && req.file.filename) {
            imageUrl = `/uploads/${req.file.filename}`;  // Lưu đường dẫn tới ảnh
        }

        // Lưu dữ liệu vào cơ sở dữ liệu
        await productServices.createNewProduct(product_name, price, category_id, imageUrl, description, quantity);

        // Chuyển hướng sau khi tạo thành công
        res.redirect('/product');
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Internal Server Error');
    }
};
const handleDeleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        await productServices.deleteProduct(productId);
        res.redirect('/product');
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Internal Server Error');
    }
};

const handleEditProductPage = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productServices.getProductById(productId);
        const categories = await categoryServices.getAllCategory();

        res.render('home.ejs', {
            data: {
                title: 'Edit Product',
                page: 'editProductPage',
                product: product,
                categories: categories,
                username: req.session.user.username
            }
        });
    } catch (error) {
        console.error('Error fetching product or categories:', error);
        res.status(500).send('Internal Server Error');
    }
};

const handleUpdateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { product_name, price, category_id, description, quantity, current_image } = req.body;

        // Kiểm tra nếu có file được tải lên
        let imageUrl = current_image; // Mặc định là ảnh cũ
        if (req.file && req.file.filename) {
            imageUrl = `/uploads/${req.file.filename}`; // Nếu có ảnh mới, cập nhật đường dẫn
        }

        // Cập nhật sản phẩm trong cơ sở dữ liệu
        await productServices.updateProduct(productId, product_name, price, category_id, imageUrl, description, quantity);

        // Chuyển hướng sau khi cập nhật thành công
        res.redirect('/product');
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Internal Server Error');
    }
};



export default { handleProductPage, handleCreateProduct, handleDeleteProduct, handleEditProductPage, handleUpdateProduct };
