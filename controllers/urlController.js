const Url = require('../models/urlModel');
const { generateShortHash } = require('../utils/hashUtils');
const { URL } = require('url'); 
const hashUrl = async (req, res, next) => {
  try {
    const { longUrl } = req.body;
    const shortHash = generateShortHash(longUrl);
    const parsedUrl = new URL(longUrl);
    const domain = parsedUrl.hostname;
    const shortUrl = `${req.protocol}://${domain}/${shortHash}`;
    const url = new Url({ shortHash, longUrl, createdBy: req.user.id });
    await url.save();
    const responseMessage = `Click the short URL: <a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
    const shorthash = shortHash
    res.json({ shortUrl, responseMessage,shorthash });
  } catch (error) {
    next(error);
  }
};

const redirectUrl = async (req, res, next) => {
  try {
    const { shortHash } = req.params;
    const url = await Url.findOne({ shortHash });
    if (url) {
      if (url.clicks >= url.maxClicks) {
        return res.status(410).json({ error: 'URL has reached its limit or is no longer valid' });
      }
      url.clicks++;
      await url.save();
      res.json({ originalUrl: url.longUrl });
    } else if (url && url.used) {
      res.status(410).json({ error: 'URL has already been used' });
    } else {
      res.status(404).json({ error: 'URL not found or click limit exceeded' });
    }
  } catch (error) {
    next(error);
  }
};


module.exports = {
  hashUrl,
  redirectUrl,
};
