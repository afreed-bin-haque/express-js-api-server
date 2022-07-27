import express from 'express';
import  'express-group-routes';
import { createRequire } from "module";
const router = express.Router();
const require = createRequire(import.meta.url);
const product_list_data = require('../data/products.json');
import { AllProducts, AllManufacturers, GetProductBySerialAndManufacturer } from '../controllers/api/ProductDistributionController.js';
import { ErrorNotFound, ErrorForbidden } from '../controllers/web/error/errorHandlerController.js'
import { StoreUser } from '../controllers/api/VerificationController.js'


  router.get('/v1', function (req, res) {
    res.status(200).redirect('/');
  });


router.group('/v1', function (router) {

  router.get('/manufacturers', AllManufacturers);

  router.get('/get/product/list', AllProducts);

  router.get('/get/product/:serial/:manufacturer', GetProductBySerialAndManufacturer);
  router.post('/store/user', StoreUser)
});

router.get('*', ErrorNotFound);
router.get('/403', ErrorForbidden)

export default router