// import chai from 'chai';
import { client } from '../http-client/client.js';
import { skyScannerAPIV3 } from '../data/skyScannerData.js';
import * as assertions from '../helpers/assertions.js';

// let expect = chai.expect;

let { baseUrl, skyScannerAPIHeader, skyScannerAPIBody } = skyScannerAPIV3;

describe('SEEK Job Search', function () {

    it('Filter by cheapest price', async () => {
        let response = await client.post({
            headers: skyScannerAPIHeader,
            url: baseUrl,
            path: 'search/create',
            data: skyScannerAPIBody()
        });

        assertions.assert200s(response);

        const { itineraries/*: price*/ } = response.data.content.results

        // let newPriceList = [];
        let itinerariesArray = Object.entries(itineraries);

        let orderedItinerariesByPrice = itinerariesArray.sort((a, b) => {
            return a[1].pricingOptions[0].price.amount - b[1].pricingOptions[0].price.amount
        });

        for (let i = 0; i < orderedItinerariesByPrice.length; i++) {
            let priceStart;
            let priceNext;

            if (i === orderedItinerariesByPrice.length - 1) {
                console.log('your prices are ordered correctly');
                console.log('no further price comparisons, breaking out...');
                break;
            }

            // grab prices, convert to int type
            priceStart = orderedItinerariesByPrice[i][1].pricingOptions[0].price.amount * 1;
            priceNext = orderedItinerariesByPrice[i + 1][1].pricingOptions[0].price.amount * 1;

            expect(priceStart).toBeLessThan(priceNext);
        }
    })

    it('Filter list of prices below $2500', async function () {
        // The below test is not ideal. We cannot control the price limits coming in.
        // Safer to compare price list based on bell curve dist. of prices maybe...?
        let response = await client.post({
            headers: skyScannerAPIHeader,
            url: baseUrl,
            path: 'search/create',
            data: skyScannerAPIBody()
        });

        assertions.assert200s(response);

        const { itineraries: price } = response.data.content.results

        let filterPriceList = [];

        Object.entries(price).forEach(([k, v]) => {
            let priceList = v.pricingOptions[0].price;

            if (priceList.amount < 2500000) {
                filterPriceList.push(`${k} : ${v}`)
            }
        })

        expect(filterPriceList).toBeArray('array')//.that.is.not.empty
    });

    it.skip('Filter by fastest route', async function () {

    });
});