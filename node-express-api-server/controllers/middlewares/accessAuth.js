const errorHandler = require('../../errors/errorHandler');
const helper = require('../helpers/helper');

const verifyUser = function (req, res, next) {
  const encData = req.headers['token'];
  const secretKey = process.env.APP_SIGNATURE;
  if (encData === null||encData === undefined){
    errorHandler.accessForbidden(req, res);
  }else{
    try {
      const decryptedData = helper.decryptData(encData, secretKey);
      const signatureGiven = decryptedData?.signature;
      const accessTokenGiven = decryptedData?.tokenPayload?.accessToken;
      const typeGiven = decryptedData?.tokenPayload?.type;
      const userGiven = decryptedData?.tokenPayload?.user;
      const expiresInGiven = decryptedData?.tokenPayload?.expiresIn;
      const validateUser = helper.verification(signatureGiven, accessTokenGiven, typeGiven, userGiven, expiresInGiven );
      if (validateUser === true) {
        next();
      } else {
        errorHandler.accessForbidden(req, res);
      }
    } catch (error) {
      if (process.env.APP_STATUS === 'local') {
        res.status(422).json({
          status: '4222',
          message: 'Unprocessable error occured',
          error: error.message,
        });
      } else {
        errorHandler.internalServerError(req, res);
      }
    }
  }
};

module.exports = verifyUser;