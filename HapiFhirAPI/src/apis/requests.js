
const fetch = require('node-fetch')

const createApi = () => {
  const headers = {
    // 'Authorization': token
    'Content-Type': 'application/json'
  }

  const getRequestAsync = async (url) => {
    const response = await
    fetch(url, {
      method: 'GET'   
    })
  const json = await response.json()
  return json
  }

  const patientSampleData = {
    "resourceType": "Patient",
    "id": "2",
    "meta": {
      "versionId": "1",
      "lastUpdated": "2019-06-12T11:50:04.661+05:30"
    },
    "text": {
      "status": "generated",
      "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><div class=\"hapiHeaderText\">Peter James <b>CHALMERS </b></div><table class=\"hapiPropertyTable\"><tbody><tr><td>Identifier</td><td>12345</td></tr><tr><td>Address</td><td><span>534 Erewhon St </span><br/><span>PleasantVille </span><span>Vic </span></td></tr><tr><td>Date of birth</td><td><span>25 December 1974</span></td></tr></tbody></table></div>"
    },
    "identifier": [{
      "use": "usual",
      "type": {
        "coding": [{
          "system": "http://hl7.org/fhir/v2/0203",
          "code": "MR"
        }]
      },
      "system": "urn:oid:1.2.36.146.595.217.0.1",
      "value": "12345",
      "period": {
        "start": "2001-05-06"
      },
      "assigner": {
        "display": "Acme Healthcare"
      }
    }],
    "active": true,
    "name": [{
        "use": "official",
        "family": "Chalmers",
        "given": [
          "Peter",
          "James"
        ]
      },
      {
        "use": "usual",
        "given": [
          "Jim"
        ]
      },
      {
        "use": "maiden",
        "family": "Windsor",
        "given": [
          "Peter",
          "James"
        ],
        "period": {
          "end": "2002"
        }
      }
    ],
    "telecom": [{
        "use": "home"
      },
      {
        "system": "phone",
        "value": "(03) 5555 6473",
        "use": "work",
        "rank": 1
      },
      {
        "system": "phone",
        "value": "(03) 3410 5613",
        "use": "mobile",
        "rank": 2
      },
      {
        "system": "phone",
        "value": "(03) 5555 8834",
        "use": "old",
        "period": {
          "end": "2014"
        }
      }
    ],
    "gender": "male",
    "birthDate": "1974-12-25",
    "deceasedBoolean": false,
    "address": [{
      "use": "home",
      "type": "both",
      "text": "534 Erewhon St PeasantVille, Rainbow, Vic  3999",
      "line": [
        "534 Erewhon St"
      ],
      "city": "PleasantVille",
      "district": "Rainbow",
      "state": "Vic",
      "postalCode": "3999",
      "period": {
        "start": "1974-12-25"
      }
    }],
    "contact": [{
      "relationship": [{
        "coding": [{
          "system": "http://hl7.org/fhir/v2/0131",
          "code": "N"
        }]
      }],
      "name": {
        "family": "du Marché T",
        "_family": {
          "extension": [{
            "url": "http://hl7.org/fhir/StructureDefinition/humanname-own-prefix",
            "valueString": "VV"
          }]
        },
        "given": [
          "Bénédict e"
        ]
      },
      "telecom": [{
        "system": "phone",
        "value": "+33 (237) 998327"
      }],
      "address": {
        "use": "home",
        "type": "both",
        "line": [
          "534 Erewhon St"
        ],
        "city": "PleasantVille",
        "district": "Rainbow",
        "state": "Vic",
        "postalCode": "3999",
        "period": {
          "start": "1974-12-25"
        }
      },
      "gender": "female",
      "period": {
        "start": "2012"
      }
    }],
    "managingOrganization": {
      "reference": "Organization/1"
    }
  }
  const consentDataSample = { "resourceType": "Consent",
  "meta":
   { "versionId": "1", "lastUpdated": "2019-08-19T08:11:54.667+05:30" },
  "status": "active",
  "patient": { "reference": "Patient/21", "display": "P." },
  "period": { "start": "1965-01-01", "end": "2017-01-01" },
  "dateTime": "2017-06-11",
  "organization":
   [ { "reference": "Organization/1", "display": "Canada Infoway 222" } ],
  "sourceAttachment":
   { "title": "The terms of the consent in lawyer speak 2222Av. 1" },
  "policyRule": "http://goodhealth.org/consent/policy/opt-in" }
 
  const putRequestAsync = async (data, url, respAsJson = true) => {
    const responseData = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type':"application/json",
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          const errObj = {
            name: 'Authenitcation error',
            message: response.statusText,
            status : response.status };
          throw errObj;
        }
        return response.json();
      }).then(data => ({ data, status:200 })).catch(err => err);
    return responseData;
  }

  const postRequestAsync = async (data, url, respAsJson = true) => {
    const responseData = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type':"application/json",
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          const errObj = {
            name: 'Authenitcation error',
            message: response.statusText,
            status : response.status };
          throw errObj;
        }
        return response.json();
      }).then(data => ({ data, status:200 })).catch(err => err);
    return responseData;
  }
  
  return {
    postRequestAsync,
    getRequestAsync,
    putRequestAsync
  }
}

module.exports = {
  createApi,
}
