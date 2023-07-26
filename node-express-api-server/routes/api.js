const expressApp = require('express');
const router = expressApp.Router();
const versionOneRouter = expressApp.Router();
const apiRoutingController = require('../controllers/http/apiRouteController');
const userVerifyAuth = require('../controllers/middlewares/accessAuth');

versionOneRouter.get('/',userVerifyAuth,apiRoutingController.defaultRerouting);
versionOneRouter.post('/admin/post-user', apiRoutingController.generateUserTokenized);
versionOneRouter.get('/search/:search_elem',userVerifyAuth,apiRoutingController.QueryRouting);

router.use('/v1', versionOneRouter);

module.exports = router