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
  options.json = options.json ?? false;

  return new Promise((resolve, reject) => RequestObj(options, resolve, reject));
}