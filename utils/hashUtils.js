const crypto = require('crypto');
const generateShortHash = () => {
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substring(0, 8);
  const input = timestamp + randomString;
  const shortHash = crypto.createHash('sha256').update(input).digest('hex').substring(0, 8);
  return shortHash;
};

module.exports = { generateShortHash };

