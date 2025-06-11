# URL Hashing System - Setup Guide

This setup guide provides detailed instructions on setting up and running the URL Hashing System. The instructions assume a local development environment for testing purposes. The deployment on AWS using the Serverless Framework is not covered in this guide as the deployment is intended for GitHub and not AWS.

## Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/try/download/community) (Community Edition)
- [Git](https://git-scm.com/)

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/url-hashing-system.git
   cd url-hashing-system
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root of the project and add the following variables:

   ```env
   PORT=4000
   MONGODB_URI=mongodb://127.0.0.1:27017/urlhashing
   SECRET_KEY=your-secret-key
   ```

   Adjust the values accordingly.

4. **Start MongoDB:**
   Start your MongoDB server. You can do this by running the `mongod` command in a separate terminal window.

5. **Run the Application:**
   ```bash
   npm start
   ```

   This will start the server at `http://localhost:4000`.

6. **Swagger Documentation:**
   Access the Swagger documentation at [http://localhost:4000/api-docs](http://localhost:4000/api-docs) to explore and test the API endpoints.

## Usage

Now that the URL Hashing System is set up locally, you can use tools like [Postman](https://www.postman.com/) or  to interact with the API.
1. Sign Up (POST)
URL: http://localhost:4000/auth/signup
Request Body:
json
Copy code
{
  "username": "your-username",
  "password": "your-password"
}
Response:
json
Copy code
{
  "message": "User created successfully"
}
2. Login (POST)
URL: http://localhost:4000/auth/login
Request Body:
json
{
  "username": "username",
  "password": "password"
}
Response:
json
{
  "token": "token",
  "expiresIn": 3600
}
3. Protected Route (GET)
URL: http://localhost:4000/auth/protected
Headers:
Key: Authorization, Value: Bearer your-jwt-token
Response:
json
{
  "message": "This is a protected route",
  "user": {
    "username": "username"
  }
}
URL Shortening Endpoints:
4. Shorten a URL (POST)
URL: http://localhost:4000/api/url/shorten
Headers:
Key: Authorization, Value: Bearer your-jwt-token
Request Body:
json
{
  "longUrl": "https://www.example.com"
}
Response:
json
{
  "shortUrl": "http://localhost:4000/abc123"
}
5. Redirect to Original URL (GET)
URL: http://localhost:4000/api/url/56190ed7
Response:
json
{
  "originalUrl": "https://www.example.com"
}


