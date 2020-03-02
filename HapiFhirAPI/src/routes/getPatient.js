const queryProxy = require('../apis/api')
/**
 * @swagger
 * /api/consentHappyFhir/patient:
 *   get:
 *     description: get patient resource
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: patientId
 *         description: patientId
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: get patient related data
 */
const query = async (req, res) => {
  try {
    const { patientId } = req.query
    const { getPatient } = queryProxy()

    const location = await getPatient(patientId)
    res.json(location)
  } catch (e) {
    logger.error(e)
    if (e.statusCode && e.statusCode === 401) {
      res.sendStatus(401)
    } else {
      res.sendStatus(400)
    }
  }
}

module.exports = {
  query,
  route: '/api/consentHappyFhir/patient'
}
