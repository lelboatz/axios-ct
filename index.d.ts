export interface RequestOptions {
    /**
     * The URL to send the request to.
     */
    url: string;
    /**
     * The http method to use, defaults to "GET".
     */
    method?: "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "OPTIONS" | "PATCH";
    /**
     * The timeout before aborting the request in milliseconds. Defaults to Infinity.
     */
    timeout?: number;
    /**
     * The time to wait between sending a request and receiving a response before aborting the request in milliseconds. Defaults to the value of `timeout`.
     */
    connectTimeout?: number;
    /**
     * The time to wait for reading a response's body before aborting the request in milliseconds. Defaults to the value of `timeout`.
     */
    readTimeout?: number;
    /**
     * The http headers to send with the request.
     */
    headers?: Record<string, string>;
    /**
     * Query parameters to append to the URL.
     */
    query?: Record<string, string>;
    /**
     * The body to send with the request. Accepts an object or a string and will be serialized using `JSON.stringify()`. Sets the Content-Type header to `application/json charset=UTF-8` and takes precedence over `form`.
     */
    body?: string | Record<string, unknown>;
    /**
     * The form data to send with the request. Sets the Content-Type header to `application/x-www-form-urlencoded`.
     */
    form?: Record<string, unknown>;
    /**
     * Whether to follow redirects. Defaults to `true`.
     */
    followRedirect?: boolean;
    /**
     * Automatically parse the response body as JSON. Defaults to `false`.
     */
    json?: boolean;
}

export interface RequestOptionsNoUrl {
    /**
     * The URL to send the request to.
     */
    url?: string;
    /**
     * The http method to use, defaults to "GET".
     */
    method?: "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "OPTIONS" | "PATCH";
    /**
     * The timeout before aborting the request in milliseconds. Defaults to Infinity.
     */
    timeout?: number;
    /**
     * The time to wait between sending a request and receiving a response before aborting the request in milliseconds. Defaults to the value of `timeout`.
     */
    connectTimeout?: number;
    /**
     * The time to wait for reading a response's body before aborting the request in milliseconds. Defaults to the value of `timeout`.
     */
    readTimeout?: number;
    /**
     * The http headers to send with the request.
     */
    headers?: Record<string, string>;
    /**
     * Query parameters to append to the URL.
     */
    query?: Record<string, string>;
    /**
     * The body to send with the request. Accepts an object or a string and will be serialized using `JSON.stringify()`. Sets the Content-Type header to `application/json charset=UTF-8` and takes precedence over `form`.
     */
    body?: string | Record<string, unknown>;
    /**
     * The form data to send with the request. Sets the Content-Type header to `application/x-www-form-urlencoded`.
     */
    form?: Record<string, unknown>;
    /**
     * Whether to follow redirects. Defaults to `true`.
     */
    followRedirect?: boolean;
    /**
     * Automatically parse the response body as JSON. Defaults to `false`.
     */
    json?: boolean;
}

export interface AxiosResponse<T = any> {
    /**
     * The response body.
     */
    data: T;
    /**
     * The https status code of the response.
     */
    status: number;
    /**
     * The status message of the response.
     */
    statusText: string;
    /**
     * The headers of the response.
     */
    headers: Record<string, string>
}

export interface AxiosError<T = any> extends Error {
    /**
     * The http error code of the response.
     */
    code?: number;
    /**
     * The response object of the request.
     */
    response?: AxiosResponse<T>;
    /**
     * Whether the error is a http error.
     */
    isAxiosError: boolean;
}

interface Axios {
    /**
     * Send a GET request
     * @param {string|RequestOptions} urlOrOptions - The URL to send the request to or the options to use
     * @param {RequestOptionsNoUrl} [options] - The options to use for this request
     * @returns {Promise<AxiosResponse>} - The response object as a promise
     * @throws {AxiosError}
     */
    get<T = any, R = AxiosResponse<T>>(urlOrOptions: string | RequestOptions, options?: RequestOptionsNoUrl): Promise<R>;

    /**
     * Send a DELETE request
     * @param {string|RequestOptions} urlOrOptions - The URL to send the request to or the options to use
     * @param {RequestOptionsNoUrl} [options] - The options to use for this request
     * @returns {Promise<AxiosResponse>} - The response object as a promise
     * @throws {AxiosError}
     */
    delete<T = any, R = AxiosResponse<T>>(urlOrOptions: string | RequestOptions, options?: RequestOptionsNoUrl): Promise<R>;

    /**
     * Send an OPTIONS request
     * @param {string|RequestOptions} urlOrOptions - The URL to send the request to or the options to use
     * @param {RequestOptionsNoUrl} [options] - The options to use for this request
     * @returns {Promise<AxiosResponse>} - The response object as a promise
     * @throws {AxiosError}
     */
    options<T = any, R = AxiosResponse<T>>(urlOrOptions: string | RequestOptions, options?: RequestOptionsNoUrl): Promise<R>;

    /**
     * Send a HEAD request
     * @param {string|RequestOptions} urlOrOptions - The URL to send the request to or the options to use
     * @param {RequestOptionsNoUrl} [options] - The options to use for this request
     * @returns {Promise<AxiosResponse<undefined>>} - The response object as a promise
     * @throws {AxiosError}
     */
    head<T = undefined, R = AxiosResponse<T>>(urlOrOptions: string | RequestOptions, options?: RequestOptionsNoUrl): Promise<R>;

    /**
     * Send a POST request
     * @param {string|RequestOptions} urlOrOptions - The URL to send the request to or the options to use
     * @param {RequestOptionsNoUrl} [options] - The options to use for this request
     * @returns {Promise<AxiosResponse>} - The response object as a promise
     * @throws {AxiosError}
     */
    post<T = any, R = AxiosResponse<T>>(urlOrOptions: string | RequestOptions, options?: RequestOptionsNoUrl): Promise<R>;

    /**
     * Send a PUT request
     * @param {string|RequestOptions} urlOrOptions - The URL to send the request to or the options to use
     * @param {RequestOptionsNoUrl} [options] - The options to use for this request
     * @returns {Promise<AxiosResponse>} - The response object as a promise
     * @throws {AxiosError}
     */
    put<T = any, R = AxiosResponse<T>>(urlOrOptions: string | RequestOptions, options?: RequestOptionsNoUrl): Promise<R>;

    /**
     * Send a PATCH request
     * @param {string|RequestOptions} urlOrOptions - The URL to send the request to or the options to use
     * @param {RequestOptionsNoUrl} [options] - The options to use for this request
     * @returns {Promise<AxiosResponse>} - The response object as a promise
     * @throws {AxiosError}
     */
    patch<T = any, R = AxiosResponse<T>>(urlOrOptions: string | RequestOptions, options?: RequestOptionsNoUrl): Promise<R>;
}

declare const axios: Axios;

/**
 * Send a request using the traditional requestV2-DO-NOT-IMPORT-FROM-HERE syntax. Defaults to GET.
 * @param options {RequestOptions} - The options to use for this request
 * @returns {Promise<AxiosResponse>} - The response object as a promise
 * @throws {AxiosError}
 */
declare function defaultRequest(options: RequestOptions): Promise<AxiosResponse>;

export { defaultRequest }
export default axios;