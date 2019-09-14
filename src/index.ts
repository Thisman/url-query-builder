type URLQueryValue = string | undefined | null | number;
interface URLQueryObject {[key: string]: URLQueryValue;}
type URLQueryParam = URLQueryObject | string;

const clearUrl = (url: string): string => {
  let clearedUrl: string = '';

  if(typeof url === 'string') {
    [clearedUrl] = url.split("?");
  } else {
    throw new Error(
        `Param 'url' in method 'clearUrl' must be a string got ${url}`);
  }

  return clearedUrl;
}

const parseQueries = (queries: URLQueryParam = ''): any => {
  let parsedQueries: URLQueryObject = {};

  if(typeof queries === 'string') {
    let queriesArray: string[] = queries.split('&');
    for(let i = 0; i < queriesArray.length; i++) {
      const [prop, value] = queriesArray[i].split('=');
      parsedQueries[prop] = value;
    }
  } else if(typeof queries === 'object' && queries !== null) {
    parsedQueries = queries;
  }

  return parsedQueries;
}

const parseQueriesFromUrl = (url: string): any => {
  let queries: any = {};

  if(typeof url === 'string') {
    [, queries] = url.split('?');
    queries = parseQueries(queries);
  } else {
    throw new Error(
        `Param 'url' in method 'parseQueriesFromUrl' must be a string got ${url}`);
  }

  return queries;
}

export default class URLQueryBuilder {
  private url: string = '';
  private queries: URLQueryObject = {};

  constructor(url: string = '', queries: URLQueryParam = '') {
    this.url = clearUrl(url);
    this.queries = (<any>Object).assign(
      parseQueriesFromUrl(url),
      parseQueries(queries)
    );
  }
  
  public get(): string {
    let queriesStr: string = '';
    for(let prop in this.queries) {
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
      for(let key in name) {
        this.set(key, name[key]);
      }
    } else {
      throw new Error(`Param 'name' must be a string or an object, got ${name}`);
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
