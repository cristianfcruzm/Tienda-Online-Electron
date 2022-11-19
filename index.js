const express = require('express');
const routerApi = require('./routes');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler
} = require('./middlewares/error.handler');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');

//Se implementa el Swagger para el servicio
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Ecommerce API',
      description: 'This api has CRUD of products',
      contact: {
        name: 'Merchan',
      },
      servers: [],
    },
  },
  apis: ['./routes/index.js'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

//------------------------USO DEL CORS----------------------------------------------------------------
const whitelist = [
  'http://127.0.0.1:5500',
  'https://localhost:3000',
  'https://myapp.co',
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};

app.use(cors(options));
//------------------------USO DEL ROUTER----------------------------------------------------------------

routerApi(app);

//------------------------USO DEL SwagerUi----------------------------------------------------------------

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
  res.status(200).send('Test');
});

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, (req, res) => {
  console.log(`Server listening on port ${port}`);
});
