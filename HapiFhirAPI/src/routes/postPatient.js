const queryProxy = require('../apis/api')

/**
 * @swagger
 * /api/consentHappyFhir/patient:
 *   post:
 *     description:  save patient resource
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: patient
 *         description: PatientData
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *     responses:
 *       201:
 *         config: configuration
 */
/* eslint-enable max-len */
const query = async (req, res) => {
  try {
    const consentBody = req.body
    const { postPatient } = queryProxy()
    const patientRes = await postPatient(consentBody)
    res.json(patientRes)
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
