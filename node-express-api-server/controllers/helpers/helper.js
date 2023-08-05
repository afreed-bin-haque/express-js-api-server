var crypto = require('crypto');
const express = require('express');
const fs = require('fs');
const path = require('path');

exports.getRandomString = function(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};

exports.encryptdata = function (data,password) {
  const dataString = JSON.stringify(data);
  const cipher = crypto.createCipher('aes-128-cbc', password);
  let encrypted = cipher.update(dataString, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

exports.decryptData = function (encryptedData, password) {
  const decipher = crypto.createDecipher('aes-128-cbc', password);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return JSON.parse(decrypted);
};

exports.verification = function (signatureGiven, accessTokenGiven, typeGiven, userGiven, expiresInGiven) {
  const filePath = path.join(__dirname, '../../storages/verifyID.json');
  const signature = process.env.APP_SIGNATURE;
  let status;
  if (fs.existsSync(filePath)) {
    const jsonData = fs.readFileSync(filePath, 'utf8')
    fetchedData = JSON.parse(jsonData);
    const existingUser = fetchedData.find((item) => item.user === userGiven);
    const {
      accessToken,
      type,
      user,
    } = existingUser;
    if (signature === signatureGiven && accessToken === accessTokenGiven && type === typeGiven && user === userGiven && new Date(expiresInGiven) >= new Date()){
      status = true;
    }else{
      status = false;
    }
  }else{
    status = true;
  }
  return status;
}