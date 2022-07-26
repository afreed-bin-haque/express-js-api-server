import express from 'express';
import 'express-group-routes';
const router = express.Router();

router.get('/', function (req, res) {
  res.status(200).json({
    status: 'Accepted',
    message: 'Welcome to Astro Ecom',
    author: 'Afreed Bin Haque'
  });
})


export default router