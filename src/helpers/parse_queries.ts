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