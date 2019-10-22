export type URLQueryValue = string | undefined | null | number;

export interface URLQueryObject {
  [key: string]: URLQueryValue
}

export type URLQueryParam = URLQueryObject | string;
