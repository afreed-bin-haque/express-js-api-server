import express from 'express';
import  'express-group-routes';
import { createRequire } from "module";
const router = express.Router();
const require = createRequire(import.meta.url);
const product_list_data = require('../data/products.json');
import { AllProducts, AllManufacturers } from '../controllers/api/ProductDistributionController.js';


  router.get('/v1', function (req, res) {
    res.status(200).redirect('/');
  });


router.group('/v1', function (router) {

  router.get('/manufacturers', AllManufacturers);

  router.get('/get/product/list', AllProducts);

  router.get('/get/product/:serial/:manufacturer', function (req, res) {
    const givenSerial = req.params.serial;
    const givenManufacturer = req.params.manufacturer;
    const finalGivenManufacturer = givenManufacturer.charAt(0).toUpperCase() + givenManufacturer.slice(1);
    const found_product = product_list_data.find(c => c.serial === givenSerial && c.manufacturer === finalGivenManufacturer);
    console.log(product_list_data);
    if (!found_product) res.status(404).json({
      status: 'Not Found',
      message: 'Did not find product asssociated with these serial and manufacturer',
      givenSerial: givenSerial,
      givenManufacturer: givenManufacturer
    });
    res.status(200).json({
      status: 'Accepted',
      found_product: found_product
    });
  });
});

router.get('*', function (req, res) {
  res.status(404).json({
    status: 'Not Found',
    message: 'Endpoint not found'
  });
});

export default router