const happyFhirBaseUrl = "http://130.147.175.221:3000"
const getPatientByIdUrl = patientId => `${happyFhirBaseUrl}/baseDstu3/Patient/${patientId}`
const postPatientUrl = `${happyFhirBaseUrl}/baseDstu3/Patient`
const postConsentUrl = `${happyFhirBaseUrl}/baseDstu3/Consent?_format=json&_pretty=true`
const getConsentByIdUrl = consentId => `${happyFhirBaseUrl}/baseDstu3/Consent/${consentId}`
const updateConsentByIdUrl = consentId => `${happyFhirBaseUrl}/baseDstu3/Consent/${consentId}`
const getAllConsentUrl = `${happyFhirBaseUrl}/baseDstu3/Consent?_format=json&_pretty=true`

module.exports = {
  happyFhirBaseUrl,
  getPatientByIdUrl,
  postConsentUrl,
  postPatientUrl,
  getConsentByIdUrl,
  updateConsentByIdUrl,
  getAllConsentUrl
}
