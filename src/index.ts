import {
  URLQueryValue,
  URLQueryObject,
  URLQueryParam 
} from './types';

import {URLQueryParamError} from './errors';
import {clearUrl} from './helpers/clear_url';
import {parseQueries} from './helpers/parse_queries';

const parseQueriesFromUrl = (url: string): URLQueryObject => {
  if(typeof url === 'string') {
    const [, queries] = url.split('?');
    return parseQueries(queries);
  } else {
    throw new URLQueryParamError(
      `Param 'url' in method 'parseQueriesFromUrl' must be a string got ${url}`);
  }
}

export default class URLQueryBuilder {
  private url = '';
  private queries: URLQueryObject = {};

  constructor(url = '', queries: URLQueryParam = '') {
    this.url = clearUrl(url);
    this.queries = Object.assign(
      parseQueriesFromUrl(url),
      parseQueries(queries)
    );
  }

  public get(): string {
    let queriesStr = '';
    for(const prop in this.queries) {
      const value = this.queries[prop];
      if(value !== undefined && value !== null) {
        queriesStr += `${prop}=${value}&`;
      };
    }
  
    // Delete last unnecessary &.
    queriesStr = queriesStr.slice(0, -1);
    return `${this.url}?${queriesStr}`;
  };

  public getClearUrl(): string {
    return this.url;
  };

  public delete(name: string): this {
    delete this.queries[name];
    
    return this;
  };

  public set(name: URLQueryParam, value?: URLQueryValue): this {
    if(typeof name === 'string') {
      this.queries[name] = value;
    } else if(typeof name === 'object' && name !== null) {
      for(const key in name) {
        this.set(key, name[key]);
      }
    } else {
      throw new URLQueryParamError(`Param 'name' must be a string or an object, got ${name}`);
    }

    return this;
  };

  public reset(queries: URLQueryParam = ''): this {
    this.queries = parseQueries(queries);

    return this;
  };

  public has(name: string): boolean {
    return this.queries.hasOwnProperty(name);
  };
}
