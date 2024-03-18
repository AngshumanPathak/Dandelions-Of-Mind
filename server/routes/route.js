import express from 'express';
import { userSignup, userLogin } from '../controller/usercontroller.js';
import { getProducts, getProductById} from '../controller/productcontroller.js';


const router = express.Router();

router.post('/signup',userSignup);
router.post('/login',userLogin);

router.get('/test/products',getProducts);
router.get('/product/:id',getProductById);


export default router;