const errorHandler = require('../../errors/errorHandler');
const jwt = require('jsonwebtoken');
const helper = require('../helpers/helper');
const fs = require('fs');
const path = require('path');

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

    const filePath = path.join(__dirname,'../../storages/verifyID.json');
    let prevData =[];
    if(fs.existsSync(filePath)){
      const jsonPrevData = fs.readFileSync(filePath, 'utf8')
      prevData = JSON.parse(jsonPrevData);
      const existingUser = prevData.findIndex((item) => item.user === user);
      if(existingUser !== -1){
        prevData[existingUser] = payload;
        fs.writeFileSync(filePath,JSON.stringify(prevData,null,2),'utf8')

        return res.status(200).json({
          status: '1001',
          message: 'Token created ✅ (User data updated)',
          token: token,
        });
      }
    }
    prevData.push(payload);
    fs.writeFileSync(filePath,JSON.stringify(prevData,null,2),'utf8')

    res.status(200).json({
      status: '1001',
      message: 'Token created ✅',
      token: token
    });
  }catch(error){
    if(process.env.APP_STATUS === 'local'){
      res.status(422).json({
          status: '4222',
          message: 'Unprocessable error occured',
          error: error.message
      });
    }else{
      errorHandler.internalServerError(req, res);
    }
  }
};

exports.QueryRouting = function(req, res){
  const search = req.params.search_elem;
    res.status(200).json({
      status: '1001',
      message: 'You have searched:'+search,
    });
}
