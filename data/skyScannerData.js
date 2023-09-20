import 'dotenv/config';

export const skyScannerApiEndpoint = "https://partners.api.skyscanner.net/apiservices/v3/flights/live";

// public api key supplied by skyscanner
const skyScannerAPIHeader = {
  'x-api-key': 'sh428739766321522266746152871799',
  'Content-Type': 'application/json'
}

const skyScannerAPIBody = (originCountry, destinationCountry) => { // need country mappings here
  return{
    "query": {
      "market": "AU",
      "locale": "en-GB",
      "currency": "AUD",
      "queryLegs": [
        {
          "originPlaceId": {
            "entityId": "95673551"
          },
          "destinationPlaceId": {
            "entityId": "95673380"
          },
          "date": {
            "year": 2023,
            "month": 12,
            "day": 25
          }
        }
      ],
      "cabinClass": "CABIN_CLASS_ECONOMY",
      "adults": 1,
      "childrenAges": [
        0
      ],
      "includedCarriersIds": [],
      "excludedCarriersIds": [],
      "includedAgentsIds": [],
      "excludedAgentsIds": [],
      "includeSustainabilityData": true,
      "nearbyAirports": true
    }
  }
};

export const skyScannerAPIV3 = {
  baseUrl: skyScannerApiEndpoint,
  skyScannerAPIHeader,
  skyScannerAPIBody
}