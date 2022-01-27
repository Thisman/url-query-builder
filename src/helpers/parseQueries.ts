import { URLQueryParamError } from '../errors';
import {
  URLQueryObject,
  URLQueryParam 
} from '../types';

export const parseQueries = (queries: URLQueryParam = ''): URLQueryObject => {
  let parsedQueries: URLQueryObject = {};

  if(typeof queries === 'string') {
    const queriesArray: string[] = queries.split('&');
    for(let i = 0; i < queriesArray.length; i++) {
      const [prop, value] = queriesArray[i].split('=');
      parsedQueries[prop] = value;
    }
  } else if(typeof queries === 'object' && queries !== null) {
    parsedQueries = queries;
  }

  return parsedQueries;
}

export const parseQueriesFromUrl = (url: string): URLQueryObject => {
  if(typeof url === 'string') {
    const [, queries] = url.split('?');
    return parseQueries(queries);
  } else {
    throw new URLQueryParamError(
      `Param 'url' in method 'parseQueriesFromUrl' must be a string got ${url}`);
  }
}
