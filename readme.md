Overview
The URL Hashing System is a web application that provides URL shortening services, allowing users to create short and easy-to-share URLs. It offers user authentication to manage shortened URLs securely.

Architecture
The system is built using the following technologies:

Node.js: Utilized for the backend server using the Express.js framework.
MongoDB: Chosen as the database for its NoSQL nature, providing flexibility in handling data.
JWT (JSON Web Token): Implemented for user authentication and authorization.
Swagger: Used for API documentation to facilitate understanding and usage.
Project Structure
The project is structured into the following main components:

Controllers: Handle business logic and interact with models.
Models: Define data schemas and interact with the database.
Routes: Define API routes and connect them to controllers.
Middleware: Implements JWT verification for protected routes.
Utilities: Provide helper functions, such as URL hashing.
How to Deploy/Use
Local Deployment
Clone the Repository:

bash
git clone https://github.com/your-username/url-hashing-system.git
cd url-hashing-system
Install Dependencies:

bash
npm install
Set Up MongoDB:

Create a MongoDB database and update the .env file with the connection URI.
Run the Application:

bash
npm start
Access API Documentation:
Open your browser and go to http://localhost:4000/api-docs for Swagger documentation.

Endpoints
User Authentication:

Sign Up: POST /auth/signup
Login: POST /auth/login
Protected Route: GET /auth/protected
URL Shortening:

Shorten a URL: POST /api/url/shorten
Redirect to Original URL: GET /api/url/{shortHash}
Acknowledgments
This project is inspired and supported by the open-source community. Special thanks to the creators of Node.js, Express.js, MongoDB, JWT, and Swagger for their valuable contributions.