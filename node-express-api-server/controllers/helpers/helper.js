exports.getRandomString = function(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};

exports.encryptdata = function (data, secretKey) {
  const cr = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), cr);
  let encryptedData = cipher.update(JSON.stringify(data), 'utf-8', 'hex');
  encryptedData += cipher.final('hex');
  return {
    cr: cr.toString('hex'),
    encryptedData,
  };
};

exports.decryptData = function (encryptedDataWithIV, secretKey) {
  const encryptedData = encryptedDataWithIV.encryptedData;
  const cr = Buffer.from(encryptedDataWithIV.cr, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), cr);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
  decryptedData += decipher.final('utf-8');
  return JSON.parse(decryptedData);
};
