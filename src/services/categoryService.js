import db from "../models/index";

const getAllCategory = async () => {
    try {
        const categories = await db.Category.findAll();
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;    
    }
}
const createNewCategory = async (categoryName) => {
    try {
        const newCategory = await db.Category.create({ category_name: categoryName });
        return newCategory;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;    
    }
}

const deleteCategory = async (categoryId) => {
    try {
        await db.Category.destroy({ where: { id: categoryId } });
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;    
    }
}
const updateCategory = async (categoryId, categoryName) => {
    try {
        await db.Category.update({ category_name: categoryName }, { where: { id: categoryId } });
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;    
    }
}


export default { getAllCategory, createNewCategory, deleteCategory, updateCategory }