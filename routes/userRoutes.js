/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and protected routes
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 */

const express = require('express');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const authController = require('../controllers/userControllers');
const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User Signup
 *     description: Endpoint for user registration
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User registered successfully
 */

router.post('/signup', authController.signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User Login
 *     description: Endpoint for user login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 */

router.post('/login', authController.login);

/**
 * @swagger
 * /auth/protected:
 *   get:
 *     summary: Protected Route
 *     description: Protected route accessible only with a valid JWT token.
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: This is a protected route
 *               user:
 *                 username: user@yopmail.com
 *       '401':
 *         description: Unauthorized - Missing or invalid token
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Token (JWT) in the format " YOUR_JWT_TOKEN"
 *         required: true
 *         schema:
 *           type: string
 *           example: YOUR_JWT_TOKEN
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 */


router.get('/protected', jwtMiddleware, (req, res) => {
  console.log('Request Headers:', req.headers);
  res.json({ message: 'This is a protected route', user: req.user });
});


module.exports = router;
