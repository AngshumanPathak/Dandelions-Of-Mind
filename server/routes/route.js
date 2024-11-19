import express from 'express';
import { userSignup, userLogin } from '../controller/usercontroller.js';
import { getProducts, getProductById } from '../controller/productcontroller.js';
import { getOthers, getOtherById } from '../controller/othercontroller.js';
import { getNameStands, getNamestandById} from '../controller/namestandcontroller.js';


const router = express.Router();

router.post('/signup',userSignup);
router.post('/login',userLogin);

router.get('/test/products',getProducts);
router.get('/test/namestands',getNameStands);
router.get('/test/others',getOthers);
router.get('/product/:id',getProductById);
router.get('/namestand/:id',getNamestandById);
router.get('/other/:id',getOtherById);




export default router;