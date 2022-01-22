import { DoNotImportThisFunction as oldRequest } from "./requestV2-DO-NOT-IMPORT-FROM-HERE"

const axios = {
    /**
     * Send a GET request
     * @param {string|RequestOptions} urlOrOptions - The URL to send the request to or the options to use
     * @param {RequestOptionsNoUrl} [options] - The options to use for this request
     * @returns {Promise<AxiosResponse>} - The response object as a promise
     * @throws {AxiosError}
     */
    get: function(urlOrOptions, options) {
        if (typeof urlOrOptions === 'string') {
            options = options || {}
            options.url = urlOrOptions;
        } else {
            options = urlOrOptions;
        }

        options.method = "GET";

        return defaultRequest(options)
    },
    /**
     * Send a DELETE request
     * @param {string|RequestOptions} urlOrOptions - The URL to send the request to or the options to use
     * @param {RequestOptionsNoUrl} [options] - The options to use for this request
     * @returns {Promise<AxiosResponse>} - The response object as a promise
     * @throws {AxiosError}
     */
    delete: function(urlOrOptions, options) {
        if (typeof urlOrOptions === 'string') {
            options = options || {}
            options.url = urlOrOptions;
        } else {
            options = urlOrOptions;
        }

        options.method = "DELETE";

        return defaultRequest(options)
    },
    /**
     * Send an OPTIONS request
     * @param {string|RequestOptions} urlOrOptions - The URL to send the request to or the options to use
     * @param {RequestOptionsNoUrl} [options] - The options to use for this request
     * @returns {Promise<AxiosResponse>} - The response object as a promise
     * @throws {AxiosError}
     */
    options: function(urlOrOptions, options) {
        if (typeof urlOrOptions === 'string') {
            options = options || {}
            options.url = urlOrOptions;
        } else {
            options = urlOrOptions;
        }

        options.method = "OPTIONS";

        return defaultRequest(options)
    },
    /**
     * Send a HEAD request
     * @param {string|RequestOptions} urlOrOptions - The URL to send the request to or the options to use
     * @param {RequestOptionsNoUrl} [options] - The options to use for this request
     * @returns {Promise<AxiosResponse<undefined>>} - The response object as a promise
     * @throws {AxiosError}
     */
    head: function(urlOrOptions, options) {
        if (typeof urlOrOptions === 'string') {
            options = options || {}
            options.url = urlOrOptions;
        } else {
            options = urlOrOptions;
        }

        options.method = "HEAD";

        return defaultRequest(options)
    },
    /**
     * Send a POST request
     * @param {string|RequestOptions} urlOrOptions - The URL to send the request to or the options to use
     * @param {RequestOptionsNoUrl} [options] - The options to use for this request
     * @returns {Promise<AxiosResponse>} - The response object as a promise
     * @throws {AxiosError}
     */
    post: function(urlOrOptions, options) {
        if (typeof urlOrOptions === 'string') {
            options = options || {}
            options.url = urlOrOptions;
        } else {
            options = urlOrOptions;
        }

        options.method = "POST";

        return defaultRequest(options)
    },
    /**
     * Send a PUT request
     * @param {string|RequestOptions} urlOrOptions - The URL to send the request to or the options to use
     * @param {RequestOptionsNoUrl} [options] - The options to use for this request
     * @returns {Promise<AxiosResponse>} - The response object as a promise
     * @throws {AxiosError}
     */
    put: function(urlOrOptions, options) {
        if (typeof urlOrOptions === 'string') {
            options = options || {}
            options.url = urlOrOptions;
        } else {
            options = urlOrOptions;
        }

        options.method = "PUT";

        return defaultRequest(options)
    },
    /**
     * Send a PATCH request
     * @param {string|RequestOptions} urlOrOptions - The URL to send the request to or the options to use
     * @param {RequestOptionsNoUrl} [options] - The options to use for this request
     * @returns {Promise<AxiosResponse>} - The response object as a promise
     * @throws {AxiosError}
     */
    patch: function(urlOrOptions, options) {
        if (typeof urlOrOptions === 'string') {
            options = options || {}
            options.url = urlOrOptions;
        } else {
            options = urlOrOptions;
        }

        options.method = "PATCH";

        return defaultRequest(options)
    }
}

/**
 * Send a request using the traditional requestV2 syntax.
 * @param options {RequestOptions} - The options to use for this request
 * @returns {Promise<AxiosResponse>} - The response object as a promise
 * @throws {AxiosError}
 */
function defaultRequest(options) {
    if (!options.url) {
        throw new Error("No request URL specified");
    }
    return oldRequest(options)
}

export { defaultRequest }
export default axios