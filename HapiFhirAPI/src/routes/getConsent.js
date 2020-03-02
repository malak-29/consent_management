const queryProxy = require('../apis/api')
/**
 * @swagger
 * /api/consentHappyFhir/consent:
 *   get:
 *     description: get Consent resource By Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: consentId
 *         description: consentId
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: get consent related data
 */
const query = async (req, res) => {
  try {
    const { consentId } = req.query
    const { getConsent } = queryProxy()

    const consent = await getConsent(consentId)
    res.json(consent)
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
  route: '/api/consentHappyFhir/consent'
}
