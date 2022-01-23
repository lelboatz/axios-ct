import { Promise } from '../../PromiseV2';
import RequestObj from './RequestObj';
const File = Java.type('java.io.File');

export function DoNotImportThisFunction(options) {
  options.method = options.method?.toUpperCase()?.trim() ?? 'GET';
  options.timeout = options.timeout ?? 0;
  options.connectTimeout = options.connectTimeout ?? options.timeout;
  options.readTimeout = options.readTimeout ?? options.timeout;
  options.headers = options.headers ?? {};
  options.query = options.query ?? {};
  options.followRedirect = options.followRedirect ?? true;
  options.parseBody = options.parseBody ?? true;
  options.bodyParser = options.parser ?? JSON.parse;
  options.parseHeaders = options.parseHeaders ?? true;
  options.headersParser = options.headersParser ?? JSON.parse;
  options.useDefaultUserAgent = options.useDefaultUserAgent ?? true;

  if (options.useDefaultUserAgent && !options.headers['User-Agent']) {
    options.headers['User-Agent'] = `axios/${JSON.parse(FileLib.read(Config.modulesFolder + "/axios/metadata.json")).version} (ChatTriggers)`;
  }

  if (options.json === true) {
    options.parseBody = true;
    options.parser = JSON.parse;
  } else if (options.json === false) {
    options.parseBody = false;
  }

  return new Promise((resolve, reject) => RequestObj(options, resolve, reject));
}