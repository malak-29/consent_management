const { getPatientByIdUrl, postConsentUrl, postPatientUrl, getConsentByIdUrl, updateConsentByIdUrl,
  getAllConsentUrl } = require('./constants')

const { createApi } = require('./requests')

const createProxy = () => {
  const { getRequestAsync, postRequestAsync, putRequestAsync } = createApi()
  
  // We could also do a get here
  const queryPatientById = async (patientId) => {
    return getRequestAsync(getPatientByIdUrl(patientId))
  }
  const queryGetAllConsent = async () => {
    return getRequestAsync(getAllConsentUrl)
  }

  const queryConsentById = async (consentId) => {
    return getRequestAsync(getConsentByIdUrl(consentId))
  }

  const queryPostconsent = async (consentBody) => {
    return postRequestAsync(consentBody, postConsentUrl)
  }

  const queryPostPatient = async (patientBody) => {
    return postRequestAsync(patientBody, postPatientUrl)
  }
  
  const queryPutConsent = async (consentId, consentData) =>{
    return putRequestAsync(consentData, updateConsentByIdUrl(consentId)) 
  }
  return {
    queryPatientById,
    queryPostconsent,
    queryPostPatient,
    queryConsentById,
    queryPutConsent,
    queryGetAllConsent
  }
}

module.exports = createProxy
