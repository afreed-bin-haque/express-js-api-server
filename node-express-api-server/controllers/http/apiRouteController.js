const jwt = require('jsonwebtoken');
const helper = require('../helpers/helper');

exports.defaultRerouting = function (req, res) {
  res.status(200).json({
    status: '1001',
    message: 'You are allowed to proceed with the request 😃',
  });
};

exports.generateUserTokenized = function (req, res) {
  try{
    const user = req.body.user;
    const type = req.body.type;
    const permition = req.body.permition;
    const rendomStrongToken = helper.getRandomString(40);
    const payload = {
      accessToken: rendomStrongToken,
      permission: permition,
      type: type,
      user: user
    };

    const secretKey = 'cuatrodev-secret-access-key';

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    res.status(200).json({
      status: '1001',
      message: 'Token created ✅',
      token: token
    });
  }catch(error){
    res.status(422).json({
      status: '4222',
      message: 'Unprocessable error occured',
      error: error.message
    });
  }
};

exports.QueryRouting = function(req, res){
  const search = req.params.search_elem;
    res.status(200).json({
      status: '1001',
      message: 'You have searched:'+search,
    });
}
