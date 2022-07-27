import express from 'express';
import 'express-group-routes';
const router = express.Router();
import { Index } from '../controllers/web/IndexController.js'

router.get('/', Index);


export default router