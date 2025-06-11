// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const urlRoutes = require('./routes/urlRoutes');
// const authRoutes = require('./routes/userRoutes');
// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');
// const jwt = require('jsonwebtoken');
// const app = express();
// const PORT = process.env.PORT || 3001;
// const URI = process.env.MONGODB_URI;
// app.use(cors());
// app.use(bodyParser.json());

// mongoose.connect(URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Your API',
//       version: '1.0.0',
//     },
//   },
//   apis: ['./routes/*.js'], 
// };
// const swaggerSpec = swaggerJsdoc(options);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use((req, res, next) => {
//   const token = req.header('Authorization');

//   if (token) {
//     req.token = token;
//   }

//   next();
// });

// app.use('/api/url', urlRoutes);
// app.use('/auth', authRoutes);
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });
// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const urlRoutes = require('./routes/urlRoutes');
const authRoutes = require('./routes/userRoutes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.send('🚀 Server is running!');
});

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {
  const token = req.header('Authorization');
  if (token) req.token = token;
  next();
});

app.use('/api/url', urlRoutes);
app.use('/auth', authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
