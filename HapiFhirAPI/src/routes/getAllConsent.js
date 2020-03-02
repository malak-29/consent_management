const queryProxy = require('../apis/api')
/**
 * @swagger
 * /api/consentHappyFhir/consent/getAll:
 *   get:
 *     description: get Consent resource By Id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: get consent related data
 */
const query = async (req, res) => {
  try {    
    const { getAllConsent } = queryProxy()

    const consentData = await getAllConsent()
    const consents = consentData.entry || []
    res.json(consents)
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
  route: '/api/consentHappyFhir/consent/getAll'
}
