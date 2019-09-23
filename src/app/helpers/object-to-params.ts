export function objectToParams(obj: any) {
  return Object.keys(obj).map(function(key) {
      return key + '=' + obj[key];
  }).join('&');
}
