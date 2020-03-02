const fhirProxy = require('./fhirQuery')

const queryProxy = () => {
  const {  queryPatientById, queryPostconsent, queryPostPatient, queryConsentById,
    queryPutConsent, queryGetAllConsent } = fhirProxy()


  const getPatient = async patientId => {
    const results = await queryPatientById(patientId)
    return results || {}
  }

  const getConsent = async consentId => {
    const results = await queryConsentById(consentId)
    return results || {}
  }

  const postConsent = async consentBody => {
    const results = await queryPostconsent(consentBody)
    return results || {}
  }
  const putConsent = async (consentId, consentBody) => {
    const results = await queryPutConsent(consentId, consentBody)
    return results || {}
  }
  
  const postPatient = async patientBody => {
    const results = await queryPostPatient(patientBody)
    return results || {}
  }

  const getAllConsent = async () => {
    const results = await queryGetAllConsent()
    return results || {}
  }
 
  return {
    getPatient,
    postConsent,
    postPatient,
    getConsent,
    putConsent,
    getAllConsent
  }
}

module.exports = queryProxy
