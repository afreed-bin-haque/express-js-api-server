import { createRequire } from "module";
const require = createRequire(import.meta.url);
const manufacturerData = require('../../data/manufacturers.json');
const product_list_data = require('../../data/products.json');


/**Get all products */
const AllProducts = function(req, res) {
  res.status(200).json({
    status: 'Accepted',
    product_list: product_list_data
  });
}

/**Get all manufacturers */
const AllManufacturers = function (req, res) {
  res.status(200).json({
    status: 'Accepted',
    manufacturers: manufacturerData
  });
}

/**Get specific product with serial and manufacturer */
const GetProductBySerialAndManufacturer = function (req, res) {
    const givenSerial = req.params.serial;
    const givenManufacturer = req.params.manufacturer;
    const finalGivenManufacturer = givenManufacturer.charAt(0).toUpperCase() + givenManufacturer.slice(1);
    const found_product = product_list_data.find(c => c.serial === givenSerial && c.manufacturer === finalGivenManufacturer);
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
  }


export { AllProducts, AllManufacturers, GetProductBySerialAndManufacturer }