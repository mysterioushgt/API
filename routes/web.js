const express = require('express')
const UserController = require('../controller/UserController')
const router = express.Router()
const{ChangeUserAuth} = require('../middleware/auth')
const ProductController = require('../controller/ProductController')
const CategoryController = require('../controller/CategoryController')
const SliderController = require('../controller/SliderController')
const PaymentController = require('../controller/PaymentController')


//usercontroller
router.get('/getalluser', UserController.getalluser)
router.get('/admin/getUser/:id', UserController.getSingleUser)
router.post('/userinsert', UserController.userinsert)
router.post('/loginUser', UserController.loginUser)
router.get('/logout', UserController.logout)
router.post('/updatePassword', ChangeUserAuth, UserController.updatePassword)
router.post('/updateProfile', ChangeUserAuth, UserController.updateProfile)
router.get('/me', ChangeUserAuth, UserController.getUserDetail)
router.get('/admin/deleteUser/:id', UserController.deleteUser)


//PRODUCTCONTROLLER
router.get('/products', ProductController.getAllProducts)
router.get('/getProductDetail/:id', ProductController.getProductDetail)
router.get('/product/getAdminProduct', ProductController.getAdminProduct)
router.get('/product/deleteProduct/:id', ProductController.deleteProduct)
router.post('/product/create', ProductController.createProduct)
router.put ('/productupdate/:id',ProductController.updateProduct)

//CATEGORY CONTROLLER
router.get('/getAllCategories', CategoryController.display);
router.post('/insertCategory', CategoryController.insert);
router.get('/getCategory/:id', CategoryController.view);
router.put('/updateCategory/:id', CategoryController.update);
router.delete('/deleteCategory/:id', CategoryController.delete);


//SLIDER CONTROLLER
router.get('/slider' , SliderController.display);
router.post('/insertSlider' , SliderController.insert);
router.get('/viewSlider/:id' , SliderController.view);
router.post('/updateSlider/:id' , SliderController.update);
router.delete('/deleteSlider/:id' , SliderController.delete);

//PAYMENT CONTROLLER
router.post('/payment/process', PaymentController.processPayment)
router.get('/stripeapiKey', PaymentController.sendStripeApiKey)

module.exports = router