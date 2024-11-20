import db from '../models/index';

const getAllProducts = async () => {
    try {
        const products = await db.Product.findAll({
            include: [{
                model: db.Category,
                attributes: ['category_name']
                
            }]
        });
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;    
    }
}

const createNewProduct = async (product_name, price, category_id, image, description, quantity) => {
    try {
        const newProduct = await db.Product.create({
            product_name,
            price,
            category_id,
            image,  // Lưu URL ảnh vào trường image
            description,
            quantity
        });
        return newProduct;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

const deleteProduct = async (productId) => {
    try {
        await db.Product.destroy({ where: { id: productId } });
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

const getProductById = async (productId) => {
    try {
        const product = await db.Product.findByPk(productId, {
            include: [
                {
                    model: db.Category, // Liên kết với model Category
                    attributes: ['category_name'], // Chỉ lấy cột category_name
                },
            ],
        });

        if (!product) {
            throw new Error('Product not found');
        }

        return product;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};


const updateProduct = async (productId, product_name, price, category_id, image, description, quantity) => {
    try {
        const updateData = { product_name, price, category_id, description, quantity };
        if (image) {
            updateData.image = image; // Chỉ cập nhật ảnh nếu giá trị ảnh tồn tại
        }
        await db.Product.update(updateData, { where: { id: productId } });
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};
// Lấy dữ liệu cơ sở dữ liệu theo category
const getProductByCategory = async (categoryId) => {
    try {
      const products = await db.Product.findAll({
        where: { category_id: categoryId },
        include: [{ model: db.Category, attributes: ['category_name'] }], // Nếu cần tên category
      });
      return products;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  };


export default { getAllProducts, createNewProduct, deleteProduct, getProductById, updateProduct , getProductByCategory };
