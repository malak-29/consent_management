const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const upload = multer()

app.use(cors())

const patient = require('./routes/getPatient')
const getConsent = require('./routes/getConsent')

const postPatient = require('./routes/postPatient')
const postConsent = require('./routes/postConsent')
const putConsent = require('./routes/putConsent')
const getAllConsent = require('./routes/getAllConsent')

const Logger = require('js-logger')
Logger.useDefaults()
global.logger = Logger

// ----------------------------------------------------------
// Prometheus Middleware hook up for metrics
// ----------------------------------------------------------
const promBundle = require('express-prom-bundle')
const metricsMiddleware = promBundle({ includeMethod: true })
app.use(metricsMiddleware)
// ----------------------------------------------------------
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get(patient.route, patient.query)
app.get(getConsent.route, getConsent.query)
app.post(postConsent.route, upload.array(), postConsent.query)
app.post(postPatient.route, upload.array(), postPatient.query)
app.put(putConsent.route, putConsent.query)
app.get(getAllConsent.route, getAllConsent.query)

let port = 5015

process.argv.forEach((val, index) => {
  if (val === '--port') {
    if (process.argv[index + 1] != null) {
      port = process.argv[index + 1]
    }
  }
})

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  basePath: '/',
}

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./src/routes/*.js'],
}

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options)
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec, true))

app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

const run = async () => {
  app.listen(port, function () {
    logger.info(`Example app listening on port ${port}!`)
  })
}

run()
