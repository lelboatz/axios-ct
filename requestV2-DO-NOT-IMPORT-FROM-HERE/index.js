import { Promise } from '../../PromiseV2';
import RequestObj from './RequestObj';

export function DoNotImportThisFunction(options) {
  options.method = options.method?.toUpperCase()?.trim() ?? 'GET';
  options.timeout = options.timeout ?? 0;
  options.connectTimeout = options.connectTimeout ?? options.timeout;
  options.readTimeout = options.readTimeout ?? options.timeout;
  options.headers = options.headers ?? {};
  options.query = options.query ?? {};
  options.followRedirect = options.followRedirect ?? true;
  options.parseBody = options.parseBody ?? true;
  options.parser = options.parser ?? JSON.parse;

  if (options.useDefaultUserAgent && !options.headers['User-Agent']) {
    options.headers['User-Agent'] = `axios/${require('../metadata.json').version} (ChatTriggers)`;
  }

  if (options.json === true) {
    options.parseBody = true;
    options.parser = JSON.parse;
  } else if (options.json === false) {
    options.parseBody = false;
  }

  return new Promise((resolve, reject) => RequestObj(options, resolve, reject));
}