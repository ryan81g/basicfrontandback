import regeneratorRuntime from "regenerator-runtime";

/**
 * Abstracted client interface for Notes API
 * It would be nice to add some caching logic into this as well
 * @param endpoint
 * @param options
 * @returns {Promise<any>} results from API call to REST Service
 */
const notesClient = async (endpoint, options) => {
    const notesBaseURL = 'http://localhost:8080/api/'; // should be set in config env variable
    let url = `${notesBaseURL}${endpoint}`;
    let reqOptions = {
        method: options.method
    };
    if (options.method == 'POST') {
        reqOptions = {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(options.requestBody)
        }
    }
    try {
        let response = await fetch(url, reqOptions);
        let resJSON = await response.json();
        return resJSON;
    } catch (e) {
        /**
         * Preferably this would be sent to a logging service to be stored and
         * analyzed or acted upon, but for time's sake, outputting to console
         */
        console.log(e)
        throw new Error(`Error getting data from ${url}`)
    }
}


export default notesClient;