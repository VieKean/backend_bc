import express from 'express';
const router = express.Router();
import userController from '../controllers/userController';
import categoryController from '../controllers/categoryController';
import productController from '../controllers/productController';
import upload from '../middlewares/upload';
import customerController from '../controllers/customerController';
import checklogin from '../middlewares/checklogin';
import orderController from '../controllers/orderController';
import reviewController from '../controllers/reviewController';
import homeController from '../controllers/homeController';

const initWebRoute = (app) => {
    router.get('/', checklogin, homeController.getHomepage);
    router.get('/account', checklogin, userController.handleAccountPage);
    router.post('/account/create-account', checklogin, userController.handleCreateAccount);
    router.get('/account/delete/:id', checklogin, userController.handleDeleteAccount);
    router.get('/account/update/:id', checklogin, userController.getUpdateAccountPage);
    router.post('/account/update/:id', checklogin, userController.handleUpdateAccountPage);

    router.get('/category', checklogin, categoryController.handleCategoryPage);
    router.post('/category/create-category', checklogin, categoryController.handleCreateCategory);
    router.get('/category/delete/:id', checklogin, categoryController.handleDeleteCategory);
    router.post('/category/update/:id', checklogin, categoryController.handleUpdateCategory);

    router.get('/product', checklogin, productController.handleProductPage);
    router.post('/product/create-product', checklogin, upload.single('image'), productController.handleCreateProduct);
    router.get('/product/delete/:id', checklogin, productController.handleDeleteProduct);
    router.get('/product/edit/:id', checklogin, productController.handleEditProductPage);
    router.post('/product/edit/:id', checklogin, upload.single('image'), productController.handleUpdateProduct);

    router.get('/customer', checklogin, customerController.handleCustomerPage);
    router.get('/customer/:id', checklogin, customerController.handleCustomerDetailPage);

    router.get('/login', userController.handleLoginPage);
    router.post('/login', userController.handlePostLogin);
    router.get('/logout', userController.handleLogout);

    router.get('/order', checklogin, orderController.handleOrderPage);

    router.post('/order/update-status/:id', checklogin, orderController.handleUpdateOrderStatus);

    router.get('/order/view/:id', checklogin, orderController.handleOrderDetailPage);

    router.get('/review' , checklogin, reviewController.handleReviewPage);


    return app.use('/', router);
}

export default initWebRoute