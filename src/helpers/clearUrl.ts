export const clearUrl = (url: string): string => {
  let clearedUrl = '';

  if(typeof url === 'string') {
    [clearedUrl] = url.split("?");
  } else {
    throw new Error(
      `Param 'url' in method 'clearUrl' must be a string got ${url}`);
  }

  return clearedUrl;
}
