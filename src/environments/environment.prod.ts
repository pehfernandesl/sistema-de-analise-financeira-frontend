export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080/api',
  auth: {
    baseUrl: '',
    authUrl: '/login/cas',
    // loginUrl: '/login/cas',
    loginUrl: 'http://localhost:8080/authenticate',
    logoutUrl: '/cas/logout',
    detailsUrl: '/api/user/details',
    tokenValidationUrl: 'http://localhost:8080/authenticate',
    storage: localStorage,
    tokenStorageIndex: 'token',
    userStorageIndex: 'user',
    loginSuccessRoute: ''
  }
};
