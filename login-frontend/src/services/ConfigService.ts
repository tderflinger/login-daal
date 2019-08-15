let USER_ENDPOINT = process.env.VUE_APP_USER_ENDPOINT;

if (process.env.NODE_ENV === 'development') {
  console.log('DEVELOPMENT!');

  USER_ENDPOINT = process.env.VUE_APP_USER_ENDPOINT;
}

if (process.env.NODE_ENV === 'production') {
  // turn off console.log outputs
  console.log = function() {};
}

console.log('USER_ENDPOINT: ', JSON.stringify(process.env));
export { USER_ENDPOINT };
