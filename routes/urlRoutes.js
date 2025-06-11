/**
 * @swagger
 * tags:
 *   name: URL
 *   description: Operations related to URL shortening
 * 
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');
const authenticate = require('../middleware/jwtMiddleware');

/**
 * @swagger
 * /api/url/shorten:
 *   post:
 *     summary: Shorten a URL
 *     description: Endpoint to create a short URL
 *     tags: [URL]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               longUrl:
 *                 type: string
 *                 format: uri
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               shortUrl: http://localhost:4000/abc123
 */
router.post('/shorten', authenticate, urlController.hashUrl);
/**
 * @swagger
 * /api/url/{shortHash}:
 *   get:
 *     summary: Redirect to original URL
 *     description: Endpoint to redirect to the original URL associated with the short hash
 *     tags: [URL]
 *     parameters:
 *       - in: path
 *         name: shortHash
 *         required: true
 *         schema:
 *           type: string
 *         description: The short hash representing the URL
 *     responses:
 *       '302':
 *         description: URL redirected
 *       '404':
 *         description: Short URL not found
 */
router.get('/:shortHash', urlController.redirectUrl);
module.exports = router;
