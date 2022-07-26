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

export { AllProducts, AllManufacturers }