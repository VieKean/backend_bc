import categoryService from "../services/categoryService";

const handleCategoryPage = async (req, res) => {
    let categoryList = await categoryService.getAllCategory();
    res.render('home.ejs', {
        data: {
            title: 'List category',
            page: 'category',
            rows: categoryList,
            username: req.session.user.username
        }
    });
}

const handleCreateCategory = async (req, res) => {
    let {category_name} = req.body;
    await categoryService.createNewCategory(category_name);
    res.redirect('/category');
}
const handleDeleteCategory = async (req, res) => {
    let id = req.params.id;
    await categoryService.deleteCategory(id);
    res.redirect('/category');
}

const handleUpdateCategory = async (req, res) => {
    let id = req.params.id;
    let {category_name} = req.body;
    await categoryService.updateCategory(id, category_name);
    res.redirect('/category');
}



export default { handleCategoryPage, handleCreateCategory, handleDeleteCategory, handleUpdateCategory }