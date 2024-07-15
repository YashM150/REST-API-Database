'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const bodyParser = require('body-parser');
const authRoutes = require('./api/routes/authroutes');
require('dotenv').config();
const path = require('path');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api', authRoutes);


var config = {
  appRoot: __dirname // required config
};

// Load the swagger.yml file
const swaggerDocument = YAML.load(path.join(__dirname, 'api', 'swagger', 'swagger.yaml'));

// Serve the Swagger UI documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;