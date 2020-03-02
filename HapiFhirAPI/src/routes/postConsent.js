const queryProxy = require('../apis/api')

/**
 * @swagger
 * /api/consentHappyFhir/consent:
 *   post:
 *     description:  save consent resource
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: consent
 *         description: ConsentData
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
    const { postConsent } = queryProxy()

    const consentRes = await postConsent(consentBody)
    res.json(consentRes)
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
