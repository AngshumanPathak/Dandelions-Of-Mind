import express from 'express';
import { userSignup, userLogin, forgotPasswordMail, resetPassword } from '../controller/usercontroller.js';
import { getProducts, getProductById } from '../controller/productcontroller.js';
import { getOthers, getOtherById } from '../controller/othercontroller.js';
import { getNameStands, getNamestandById} from '../controller/namestandcontroller.js';
import { addPaymentGateway } from '../controller/paymentcontroller.js';
import { isAdmin, verifyToken } from '../middlewares/authMiddleware.js';
import { createOrder, getOrders, updateOrderStatus } from '../controller/orderController.js';
import { getCartFromBackend, saveCart } from '../controller/cartController.js';


const router = express.Router();

router.post('/signup',userSignup);
router.post('/login',userLogin);
router.post('/forgot-password',forgotPasswordMail);

router.get('/test/products',getProducts);
router.get('/test/namestands',getNameStands);
router.get('/test/others',getOthers);
router.get('/product/:id',getProductById);
router.get('/namestand/:id',getNamestandById);
router.get('/other/:id',getOtherById);
router.post('/payment',addPaymentGateway);
router.post('/orderConfirmed', verifyToken, createOrder);
router.post('/reset-password/:token',resetPassword);
router.get('/orders', verifyToken, getOrders);
router.patch('/orders/:_id/status', verifyToken, updateOrderStatus )
router.get('/admin-dashboard', isAdmin);
router.post('/save-cart', verifyToken, saveCart);
router.get('/save-cart',verifyToken,getCartFromBackend)





export default router;