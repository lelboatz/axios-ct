import socketFactory from './letsEncryptCerts';

const HTTPUrlConnection = Java.type('java.net.HttpURLConnection');
let methodsField = HTTPUrlConnection.class.getDeclaredField('methods');
methodsField.setAccessible(true);
const Field = Java.type('java.lang.reflect.Field');
let modifiersField = Field.class.getDeclaredField('modifiers');
modifiersField.setAccessible(true);
const Modifier = Java.type('java.lang.reflect.Modifier');
modifiersField.setInt(methodsField, methodsField.getModifiers() & ~Modifier.FINAL);
const JavaArray = Java.type('java.lang.reflect.Array');
const methods = JavaArray.newInstance(java.lang.String, methodsField.get(HTTPUrlConnection).length + 1);
for (let i = 0; i < methods.length; i++) {
  methods[i] = ["GET", "POST", "HEAD", "OPTIONS", "PUT", "DELETE", "TRACE", "PATCH"][i];
}
methodsField.set(null, methods);

let JURL = Java.type('java.net.URL');
let JDataOutputStream = Java.type('java.io.DataOutputStream');
let JURLEncoder = Java.type('java.net.URLEncoder');
let JBufferedReader = Java.type('java.io.BufferedReader');
let JInputStreamReader = Java.type('java.io.InputStreamReader');
let JString = Java.type('java.lang.String');
let JOutputStreamWriter = Java.type('java.io.OutputStreamWriter');
let JGZIPInputStream = Java.type('java.util.zip.GZIPInputStream');

function RequestObj(options, resolve, reject) {

  function getQueryString(options) {
    let queryString = '';
    for (const [key, value] of Object.entries(options)) {
      if (options.hasOwnProperty(key)) {
        queryString += `${JURLEncoder.encode(key, 'UTF-8')}=${JURLEncoder.encode(value, 'UTF-8')}&`;
      }
    }
    return queryString.length > 0 ? queryString.substr(0, queryString.length - 1) : queryString;
  }

  new Thread(() => {
    try {
      let queryString = '?' + getQueryString(options.query);
      if (queryString.length > 1) {
        options.url += queryString;
      }

      let url = new JURL(options.url)
      let conn = url.openConnection();
      conn.setSSLSocketFactory(socketFactory);
      conn.setRequestMethod(options.method);
      conn.setDoOutput(true);
      conn.setConnectTimeout(options.connectTimeout);
      conn.setReadTimeout(options.readTimeout);
      conn.setInstanceFollowRedirects(options.followRedirect);
      conn.setRequestProperty('Accept-Encoding', 'gzip');

      Object.keys(options.headers).forEach(header => conn.setRequestProperty(header, options.headers[header]));

      if (options.method === "GET" || options.method === "DELETE" || options.method === "OPTIONS") {
        let statusCode = parseInt(conn.getResponseCode());
        let content = '';
        let stream = conn[statusCode > 299 ? 'getErrorStream' : 'getInputStream']();
        stream = 'gzip' === conn.getContentEncoding() ? new JGZIPInputStream(stream) : stream;

        let reader = new JBufferedReader(new JInputStreamReader(stream));

        while (true) {
          let inputLine = reader.readLine();
          if (!inputLine) break;
          content += inputLine;
        }

        reader.close();
        conn.disconnect();

        let headers = {}
        let headerFields = conn.getHeaderFields();
        headerFields.forEach((key, value) => {
          if (options.parseHeaders) {
            try {
              value = (options.headersParser)(value);
            } catch (e) {
              if (options.headersParser !== JSON.parse) {
                throw e;
              }
            }
          }
          headers[key] = value[0];
        });

        if (options.parseBody && content && headers['Content-Type'] === 'application/json') {
          try {
            content = (options.bodyParser)(content);
          } catch (e) {
            if (options.bodyParser !== JSON.parse) {
              throw e;
            }
          }
        }

        if (statusCode > 299) {
          reject({
            code: statusCode,
            response: {
              data: content,
              status: statusCode,
              statusText: conn.getResponseMessage(),
              headers
            },
            isAxiosError: true
          })
        } else {

          resolve({
            data: content,
            status: statusCode,
            statusText: conn.getResponseMessage(),
            headers
          })
        }
      } else if (options.method === "HEAD") {
        let statusCode = parseInt(conn.getResponseCode());
        let headers = {}
        let headerFields = conn.getHeaderFields();
        headerFields.forEach((key, value) => {
          if (options.parseHeaders) {
            try {
              value = (options.headersParser)(value);
            } catch (e) {
              if (options.headersParser !== JSON.parse) {
                throw e;
              }
            }
          }
          headers[key] = value[0];
        });

        if (statusCode > 299) {
          reject({
            code: statusCode,
            response: {
              status: statusCode,
              statusText: conn.getResponseMessage(),
              headers
            },
            isAxiosError: true
          })
        } else {
          resolve({
            status: statusCode,
            statusText: conn.getResponseMessage(),
            headers
          })
        }
      } else if (options.method === "POST" || options.method === "PUT" || options.method === "PATCH") {
        if (typeof options.body === 'object') {
          conn.setRequestProperty('Content-Type', 'application/json; charset=UTF-8');
          let wr;

          try {
            let body = JSON.stringify(options.body);
            conn.setRequestProperty('Content-Length', new JString(body).getBytes('UTF-8').length.toString());
            wr = new JOutputStreamWriter(conn.getOutputStream());
            wr.write(body);
            wr.close();
          } catch (e) {
            print(e);
          } finally {
            wr.close();
          }
        } else if (typeof options.form === 'object') {
          let params = getQueryString(options.form);
          let bytes = new JString(params).getBytes('UTF-8');
          conn.setRequestProperty('Content-Type', 'application/x-www-form-urlencoded');
          conn.setRequestProperty('Content-Length', bytes.length.toString());
          let wr;

          try {
            wr = new JDataOutputStream(conn.getOutputStream());
            wr.write(bytes)
          } catch (e) {
            print(e);
          } finally {
            wr.close();
          }
        }

        let statusCode = parseInt(conn.getResponseCode());
        let content = '';
        let stream = conn[statusCode > 299 ? 'getErrorStream' : 'getInputStream']();
        stream = 'gzip' === conn.getContentEncoding() ? new JGZIPInputStream(stream) : stream;

        let reader = new JBufferedReader(new JInputStreamReader(stream));

        while (true) {
          let inputLine = reader.readLine();
          if (!inputLine) break;
          content += inputLine;
        }

        reader.close();
        conn.disconnect();

        let headers = {}
        let headerFields = conn.getHeaderFields();
        headerFields.forEach((key, value) => {
          if (options.parseHeaders) {
            try {
              value = (options.headersParser)(value);
            } catch (e) {
              if (options.headersParser !== JSON.parse) {
                throw e;
              }
            }
          }
          headers[key] = value[0];
        });

        if (options.parseBody && content && headers['Content-Type'] === 'application/json') {
          try {
            content = (options.bodyParser)(content);
          } catch (e) {
            if (options.bodyParser !== JSON.parse) {
              throw e;
            }
          }
        }

        if (statusCode > 299) {
          reject({
            code: statusCode,
            response: {
              status: statusCode,
              statusText: conn.getResponseMessage(),
              headers
            },
            isAxiosError: true
          })
        } else {
          resolve({
            data: content,
            status: statusCode,
            statusText: conn.getResponseMessage(),
            headers
          })
        }
      }
    } catch (error) {
      error.isAxiosError = false;
      reject(error)
    }
  }).start()
}

export { RequestObj as default };
