//api.js
import express from 'express'
const router = express.Router()
import apiUserController from '../controllers/apiUserController'
import apiProductController from '../controllers/apiProductController'
import apiCategoryController from '../controllers/apiCategoryController'
import apiCustomerController from '../controllers/apiCustomerController'
import apiCartController from '../controllers/apiCartController'
import apiUpdateCart from '../controllers/apiUpdateCart'
const initAPIRoute = (app) => {

  // Customer routers
  router.get('/profile_customer/show/:id', apiCustomerController.fetchOneCustomer)
  router.put('/profile_customer/update/:id', apiCustomerController.updateCustomer)

  // User routes
  router.post('/login', apiUserController.handleLoginApi);
  router.post('/register', apiUserController.handleRegister);
  router.post('/logout', apiUserController.handleLogout);

  // Product routes
  router.get('/product', apiProductController.fetchAllProducts);
  router.get('/product/:id', apiProductController.getProductById);

  // Cart router 
  router.post('/cart/addPrd', apiCartController.Cart)
  router.post('/cart', apiCartController.fetchCart)
  // Category routes
  router.get('/category', apiCategoryController.fetchAllCategories);
  router.put('/cart/update', apiUpdateCart.updateQuantityInCart)
  return app.use("/api/v1", router)
}

export default initAPIRoute
