//api.js
import express from 'express'
const router = express.Router()
import apiUserController from '../controllers/apiUserController'
import apiProductController from '../controllers/apiProductController'
import apiCategoryController from '../controllers/apiCategoryController'

const initAPIRoute = (app) => {
  // User routes
  router.post('/login', apiUserController.handleLoginApi); 
  router.post('/register', apiUserController.handleRegister);
  router.post('/logout', apiUserController.handleLogout);

  // Product routes
  router.get('/product', apiProductController.fetchAllProducts);
  router.get('/product/:id', apiProductController.getProductById);

  // Category routes
  router.get('/category', apiCategoryController.fetchAllCategories);

  return app.use("/api/v1", router)
}

export default initAPIRoute
