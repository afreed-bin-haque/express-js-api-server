const expressApp = require('express');
const router = expressApp.Router();
const versionOneRouter = expressApp.Router();
const apiRoutingController = require('../controllers/apiRouteController');

versionOneRouter.get('/',apiRoutingController.defaultRerouting);

router.use('/v1', versionOneRouter);

module.exports = router